import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Colors, Fonts} from '../contants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {CartAction, WishlistAction} from '../actions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CategoryService, FoodService} from '../services';
import UserService from '../services/UserService';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      FoodService.getAllFood().then(response => {
        if (response?.status) {
          setAllProducts(response?.data);
        }
      });
    });
    return unsubscribe;
  }, [allProducts]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      UserService.getUserData().then(response => {
        if (response?.status) {
          setUser(response?.data);
        }
      });
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      FoodService.getFood().then(response => {
        if (response?.status) {
          setProducts(response?.data);
        }
      });
    });
    return unsubscribe;
  }, [products]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      CategoryService.getCategoryData().then(response => {
        if (response?.status) {
          setCategories(response?.data);
        }
      });
    });
    return unsubscribe;
  }, [categories]);

  useEffect(() => {
    if (categories.length > 0 && selectedCategoryIndex >= 0) {
      const selectedCategoryId = categories[selectedCategoryIndex]._id;
      const apiUrl = `http://10.0.2.2:5000/product/productsByCategory/${selectedCategoryId}`;

      axios
        .get(apiUrl)
        .then(response => {
          setProducts(response?.data?.data);
        })
        .catch(error => {
          console.error('Lỗi khi lấy danh sách sản phẩm theo danh mục:', error);
        });
    }
  }, [selectedCategoryIndex, categories]);
  const searchProducts = () => {
    const keyword = searchKeyword.toLowerCase();

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(keyword),
    );

    setSearchedProducts(filteredProducts);
  };

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}>
        <TouchableOpacity
          key="all"
          activeOpacity={0.8}
          onPress={() => {
            setSelectedCategoryIndex(-1);
            setSearchedProducts(allProducts); // Set searched products to all products
          }}>
          <View
            style={{
              backgroundColor:
                selectedCategoryIndex === -1
                  ? Colors.DEFAULT_GREEN
                  : Colors.LIGHT_GREEN,
              ...styles.categoryBtn,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
                justifyContent: 'center',
                alignContent: 'center',
                color:
                  selectedCategoryIndex === -1
                    ? Colors.DEFAULT_WHITE
                    : Colors.DEFAULT_GREEN,
              }}>
              Tất cả món ăn
            </Text>
          </View>
        </TouchableOpacity>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedCategoryIndex(index);
              searchProducts(); // Trigger search when a category is selected
            }}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex === index
                    ? Colors.DEFAULT_GREEN
                    : Colors.LIGHT_GREEN,
                ...styles.categoryBtn,
              }}>
              <View style={styles.categoryBtnImgCon}>
                <Image
                  source={{uri: category.image}}
                  onError={error => console.log('Error loading image:', error)}
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: 'cover',
                    borderRadius: 50,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex === index
                      ? Colors.DEFAULT_WHITE
                      : Colors.DEFAULT_GREEN,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const Card = ({productId}) => {
    const idProduct = productId?._id;
    const dispatch = useDispatch();
    const addToCart = productId => dispatch(CartAction.addToCart({productId}));
    const removeFromCart = productId =>
      dispatch(CartAction.removeFromCart({productId}));
    const itemCount = useSelector(
      state =>
        state?.cartState?.cart?.products?.find(
          product => product?.product?._id === idProduct,
        )?.count,
    );

    const toggleHeartColor = productId => {
      dispatch(WishlistAction.addToWishlist({productId}));
    };
    const isProductInWishlist = user?.wishList?.some(
      item => item?._id === idProduct,
    );
    return (
      <TouchableHighlight
        underlayColor={Colors.DEFAULT_WHITE}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Detail', {item: productId})}>
        <View style={styles.card}>
          <View style={{alignItems: 'center', top: -40}}>
            <TouchableOpacity
              onPress={() => toggleHeartColor(idProduct)}
              style={{
                position: 'absolute',
                height: 20,
                width: 20,
                borderRadius: 32,
                justifyContent: 'center',
                alignItems: 'center',
                right: 1,
                top: -10,
              }}>
              <Ionicons
                name="heart"
                size={20}
                color={
                  isProductInWishlist ? Colors.DEFAULT_RED : Colors.DEFAULT_GREY
                }
              />
            </TouchableOpacity>
            <Image
              source={{uri: productId.images}}
              style={{height: 120, width: 120}}
              onError={error => console.log('Error loading image:', error)}
            />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {productId.name}
            </Text>

            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {productId.price}.000 vnd
            </Text>
          </View>
          <View style={styles.itemAddContainer}>
            <AntDesign
              name="minus"
              color={Colors.DEFAULT_YELLOW}
              size={18}
              onPress={() => removeFromCart(idProduct)}
            />
            <Text style={styles.itemCountText}>
              {itemCount ? itemCount : 0}
            </Text>
            <AntDesign
              name="plus"
              color={Colors.DEFAULT_YELLOW}
              size={18}
              onPress={() => addToCart(idProduct)}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Tìm kiếm đồ ăn"
            value={searchKeyword}
            onChangeText={text => setSearchKeyword(text)}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={searchProducts}>
          <Icon name="search" size={28} color={Colors.DEFAULT_WHITE} />
        </TouchableOpacity>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={searchedProducts.length > 0 ? searchedProducts : products}
        renderItem={({item}) => <Card productId={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_GREY,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchButton: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 230,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    justifyContent: 'space-between',
    elevation: 13,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Colors.DEFAULT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemAddContainer: {
    width: cardWidth,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'space-around',
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
});
