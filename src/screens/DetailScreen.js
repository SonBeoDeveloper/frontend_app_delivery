import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text, Image, Button} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts, Images} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Display} from '../untils';
import {RatingUser, TextButton} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CartAction, ProductAction, WishlistAction} from '../actions';
const DetailScreen = ({navigation, route}) => {
  const item = route?.params?.item;
  const productId = item?._id;
  const [isHeartRed, setIsHeartRed] = useState(false);
  const toggleHeartColor = productId => {
    setIsHeartRed(!isHeartRed);
    dispatch(WishlistAction.addToWishlist({productId}));
  };
  const dispatch = useDispatch();
  const cart = useSelector(state => state?.cartState?.cart);
  const numberOfItemsInCart = cart?.products?.length || 0;
  function renderHeader() {
    return (
      <View
        style={{
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sản phẩm</Text>
        <View
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: Colors.LIGHT_GREEN,
          }}>
          <Icon name="shopping-cart" size={28} />
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: 17,
              width: 17,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: Colors.DEFAULT_GREEN,
            }}>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 15,
                color: Colors.DEFAULT_WHITE,
              }}
              onPress={() => navigation.navigate('Giỏ hàng')}>
              {numberOfItemsInCart}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderDetail() {
    return (
      <View style={{marginTop: 30, marginBottom: 10, paddingHorizontal: 10}}>
        <View
          style={{
            height: 190,
            borderRadius: 15,
            backgroundColor: Colors.LIGHT_GREY2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
              paddingHorizontal: 30,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="whatshot" size={20} color={Colors.DEFAULT_RED} />
              <Text
                style={{
                  color: Colors.DARK_THREE,
                  fontSize: 14,
                  lineHeight: 22,
                }}>
                {item?.price} calories
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleHeartColor(productId)}>
              <Ionicons
                name="heart"
                size={20}
                color={isHeartRed ? Colors.DEFAULT_RED : Colors.DEFAULT_GREY}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{uri: item?.images}}
            resizeMode="contain"
            style={{height: 170, width: '100%'}}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 28, lineHeight: 36}}>{item?.name}</Text>
          <Text
            style={{
              marginTop: 8,
              color: Colors.DARK_FIVE,
              textAlign: 'justify',
              fontSize: 18,
              lineHeight: 22,
              textTransform: 'capitalize',
            }}>
            {item?.description}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 30,
                paddingVertical: 8,
                borderRadius: 25,
                backgroundColor: Colors.DEFAULT_GREEN,
              }}>
              <Icon name="star" size={20} color={Colors.DEFAULT_WHITE} />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  color: Colors.DEFAULT_WHITE,
                }}>
                {item?.totalrating}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 30,
              }}>
              <MaterialCommunityIcons
                name="clock"
                size={20}
                color={Colors.DEFAULT_BLACK}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  lineHeight: 22,
                }}>
                15 phút
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 30,
                paddingVertical: 8,
                borderRadius: 30,
                marginLeft: 30,
                paddingHorizontal: 0,
              }}>
              <Icon
                name="attach-money"
                size={20}
                color={Colors.DEFAULT_BLACK}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  lineHeight: 22,
                }}>
                Free shipping
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderRateUser() {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const dispatch = useDispatch();
    const product = useSelector(state =>
      state?.productState?.product?.find(item => item?._id === productId),
    );
    const handleRatingChange = value => {
      setRating(value);
    };

    const handleCommentChange = text => {
      setComment(text);
    };

    const handleSubmit = () => {
      const user = {
        star: rating,
        comment: comment,
        productId: productId,
      };
      console.log(user);
      dispatch(ProductAction.rating(user));
    };

    const data = [
      {key: 1, label: '1 star'},
      {key: 2, label: '2 star'},
      {key: 3, label: '3 star'},
      {key: 4, label: '4 star'},
      {key: 5, label: '5 star'},
    ];

    return (
      <View>
        <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View
              style={{
                width: '20%',
                height: 50,
              }}>
              <Text style={{fontSize: 18}}>Star</Text>
              <ModalSelector
                data={data}
                initValue={
                  selectedRating ? (
                    <Text style={{color: Colors.DEFAULT_RED}}>
                      {data.find(item => item.key === selectedRating)?.label}
                    </Text>
                  ) : (
                    'Star'
                  )
                }
                onChange={option => {
                  handleRatingChange(option.key);
                  setSelectedRating(option.key);
                }}
              />
            </View>

            <View style={{width: '70%'}}>
              <Text style={{fontSize: 18}}>Bình luận</Text>
              <TextInput
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 10,
                }}
                onChangeText={handleCommentChange}
                value={comment}
                placeholder="Nhập bình luận..."
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.DEFAULT_GREEN,
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={handleSubmit}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>

        {product?.ratings?.map(rating => (
          <View
            key={rating._id} // Assuming _id is the unique identifier for ratings
            style={{
              paddingHorizontal: 10,
              marginVertical: 10,
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Images.GOOGLE}
                style={{width: 40, height: 50, borderRadius: 30}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 20,
                  marginRight: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    lineHeight: 22,
                  }}>
                  {rating.postedby?.fullname}
                </Text>
                <RatingUser
                  rating={rating?.star}
                  iconStyle={{marginLeft: 3, size: 5}}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <Text>{rating?.comment}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
  function renderFooter() {
    const addToCart = productId => dispatch(CartAction.addToCart({productId}));
    const removeFromCart = productId =>
      dispatch(CartAction.removeFromCart({productId}));
    const itemCount = useSelector(
      state =>
        state?.cartState?.cart?.products?.find(
          product => product?.product?._id === productId,
        )?.count,
    );
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 90,
          alignItems: 'center',
          paddingHorizontal: '10',
          paddingBottom: '25',
        }}>
        <View style={style.itemAddContainer}>
          <AntDesign
            name="minus"
            color={Colors.DEFAULT_YELLOW}
            size={18}
            onPress={() => removeFromCart(productId)}
          />
          <Text style={style.itemCountText}>{itemCount ? itemCount : 0}</Text>
          <AntDesign
            name="plus"
            color={Colors.DEFAULT_YELLOW}
            size={18}
            onPress={() => addToCart(productId)}
          />
        </View>
        <TextButton
          buttonContainerStyle={{
            flex: 1,
            flexDirection: 'row',
            height: 60,
            marginLeft: 25,
            paddingHorizontal: 25,
            borderRadius: 25,
            backgroundColor: Colors.DEFAULT_GREEN,
          }}
          onPress={() => navigation.navigate('Giỏ hàng')}
          label="Mua hàng"
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: Colors.DEFAULT_WHITE}}>
      {renderHeader()}

      <ScrollView>
        {renderDetail()}

        {renderRateUser()}
      </ScrollView>
      {renderFooter()}
    </View>
  );
};

export default DetailScreen;

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: Colors.DEFAULT_GREEN,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: Colors.DEFAULT_WHITE,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: Display.setWidth(5),
    justifyContent: 'space-between',
    backgroundColor: Colors.LIGHT_GREEN,
    width: Display.setWidth(100),
    paddingVertical: Display.setWidth(2.5),
    height: Display.setHeight(3),
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    height: Display.setHeight(6),
    width: Display.setWidth(30),
    justifyContent: 'center',
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    marginHorizontal: 8,
  },
  cartButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: Display.setHeight(6),
    width: Display.setWidth(58),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cartButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Colors.DEFAULT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
