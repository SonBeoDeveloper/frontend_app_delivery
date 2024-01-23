import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {CartAction, CouponAction} from '../actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '../contants';
import {Display} from '../untils';
import Toast from 'react-native-toast-message';
const AddCoupon = ({navigation}) => {
  const [couponCode, setCouponCode] = useState('');
  const dispatch = useDispatch();
  const handleAddCoupon = () => {
    dispatch(CouponAction.addCoupon(couponCode));
    navigation.goBack();
  };
  useEffect(() => {
    dispatch(CartAction.getCartItems());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Thêm mã giảm giá</Text>
      </View>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Thêm mã giảm giá</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã giảm giá"
        value={couponCode}
        onChangeText={setCouponCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddCoupon}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: Colors.DEFAULT_GREEN,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  input: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
    borderColor: Colors.DEFAULT_GREEN,
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 16,
  },
});

export default AddCoupon;
