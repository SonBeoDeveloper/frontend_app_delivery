// OrderStatusScreen.js

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Display} from '../untils';
import {Colors, Fonts, Images} from '../contants';
import {Separator} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CartAction} from '../actions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderStatusScreen = ({navigation}) => {
  const orders = useSelector(state => state?.cartState?.confirm);
  const dispatch = useDispatch();
  const handleConfirmReceipt = orderId => {
    dispatch(CartAction.confirmOrderReceived({orderId}));
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${
      (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }`;
    return `${formattedDate} - ${formattedTime}`;
  };
  useEffect(() => {
    dispatch(CartAction.getConfirmOrder());
  }, [dispatch]);

  const getStatusComponent = status => {
    switch (status) {
      case 'Chờ xác nhận':
        return (
          <Text style={{fontWeight: 'bold', color: 'blue'}}>Chờ xác nhận</Text>
        );
      case 'Đang chế biến':
        return (
          <Text style={{fontWeight: 'bold', color: 'green'}}>
            Đang chế biến
          </Text>
        );
      case 'Đang giao hàng':
        return (
          <Text style={{fontWeight: 'bold', color: 'orange'}}>
            Đang giao hàng
          </Text>
        );

      case 'Hủy xác nhận':
        return (
          <Text style={{fontWeight: 'bold', color: 'red'}}>Hủy xác nhận</Text>
        );

      default:
        return null;
    }
  };

  const renderItem = ({item}) => (
    <View style={{padding: 10}}>
      <Text>Order ID: {item._id}</Text>
      <View>{getStatusComponent(item.orderStatus)}</View>
      <Text>Date: {formatDate(item.createdAt)}</Text>
      {item.orderStatus === 'Đang chế biến' && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => handleConfirmReceipt(item._id)}>
          <Text
            style={{
              color: Colors.DEFAULT_GREEN,
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Xác nhận đơn hàng
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Chờ xác nhận</Text>
      </View>
      {orders.length > 0 ? (
        <FlatList
          style={{paddingVertical: 10, paddingHorizontal: 20}}
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={Images.EMPTY_CART}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Đơn đặt hàng rỗng</Text>
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
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: Fonts.POPPINS_LIGHT,
    lineHeight: 30 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  emptyCartSubText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.INACTIVE_GREY,
  },
  addButtonEmpty: {
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 8,
    paddingHorizontal: Display.setWidth(4),
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'space-evenly',
    elevation: 3,
    alignItems: 'center',
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: Display.setWidth(60),
    width: Display.setWidth(60),
  },
});
export default OrderStatusScreen;
