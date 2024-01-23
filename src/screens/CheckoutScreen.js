import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Images, dummyData} from '../contants';
import {Image} from 'react-native-elements';
import {FoodCard, FooterTotal, Separator} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {CartAction} from '../actions';
import {Display} from '../untils';
import FormDialog from '../components/FormDialog';
import UserService from '../services/UserService';
import FoodCartCheck from '../components/FoodCartCheck';

const CheckoutScreen = ({navigation, route}) => {
  const [userData, setUser] = useState([]);
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(null);
  const [showFormDialog, setShowFormDialog] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      UserService.getUserData().then(response => {
        if (response?.status) {
          setUser(response?.data);
        }
      });
    });
    return unsubscribe;
  }, [userData]);
  const cartData = useSelector(state => state?.cartState?.cart);
  const total = cartData?.cartTotal;
  const discount =
    cartData?.cartTotal -
    (cartData?.cartTotal * cartData?.totalAfterDiscount) / 100;
  const formattedTotal = cartData?.totalAfterDiscount
    ? `${Number(discount).toFixed(1)}`
    : `${Number(cartData?.cartTotal).toFixed(1)}`;

  useEffect(() => {
    let {selectedCard} = route.params;
    setSelectedCard(selectedCard);
  }, []);
  function Header() {
    return (
      <View
        style={{
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Checkout</Text>
      </View>
    );
  }
  const handlePayment = async () => {
    try {
      dispatch(CartAction.cashOrder());
      navigation.replace('Success');
    } catch (error) {
      console.error('Error in handlePayment:', error);
    }
  };
  function renderDeliveryAdd() {
    return (
      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 20, lineHeight: 22}}>Địa chỉ giao hàng</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
            paddingHorizontal: 10,
            paddingVertical: 30,
            borderWidth: 2,
            borderRadius: 30,
            borderColor: Colors.LIGHT_GREY2,
          }}>
          <Image source={Images.LOCATION} style={{width: 40, height: 40}} />
          <Text
            style={{
              marginLeft: 30,
              width: '75%',
              fontSize: 20,
              lineHeight: 22,
            }}>
            {userData?.address}
          </Text>

          <TouchableOpacity
            style={{marginLeft: 'auto', padding: 10}}
            onPress={() => setShowFormDialog(true)}>
            <Text style={{color: Colors.DEFAULT_GREEN, fontWeight: 'bold'}}>
              Sửa
            </Text>
          </TouchableOpacity>
          <FormDialog
            visible={showFormDialog}
            onClose={() => setShowFormDialog(false)}
            onSubmit={newAddress => {
              dispatch(CartAction.changeAddress(newAddress));
              setShowFormDialog(false);
              // You can dispatch an action to update the address in Redux
            }}
            initialAddress={userData?.address}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.DEFAULT_WHITE}}>
      {Header()}

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        extraScrollHeight={-200}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}>
        {renderDeliveryAdd()}
        <View>
          {cartData?.products && cartData?.products.length > 0 ? (
            <>
              <ScrollView>
                <View style={styles.foodList}>
                  {cartData?.products?.map(item => (
                    <FoodCartCheck
                      {...item?.product}
                      navigate={() => navigation.navigate('Detail')}
                    />
                  ))}
                </View>
                <Separator height={Display.setHeight(9)} />
              </ScrollView>
            </>
          ) : (
            <View style={styles.emptyCartContainer}>
              <Image
                style={styles.emptyCartImage}
                source={Images.EMPTY_CART}
                resizeMode="contain"
              />
              <Text style={styles.emptyCartText}>Giỏ hàng rỗng</Text>
              <Text style={styles.emptyCartSubText}>
                Quay lại trang chủ để đặt đồ ăn
              </Text>
              <TouchableOpacity
                style={styles.addButtonEmpty}
                onPress={() => navigation.navigate('Trang chủ')}>
                <AntDesign name="plus" color={Colors.DEFAULT_WHITE} size={20} />
                <Text style={styles.addButtonEmptyText}>Thêm đồ ăn</Text>
              </TouchableOpacity>
              <Separator height={Display.setHeight(15)} />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      <FooterTotal
        subTotal={Number(total)}
        total={formattedTotal}
        onPress={handlePayment}
      />
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
