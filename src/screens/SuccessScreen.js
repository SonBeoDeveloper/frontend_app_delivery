import {StyleSheet, Text, View, BackHandler, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Images} from '../contants';
import {TextButton} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {CartAction} from '../actions';

const SuccessScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const emptyCart = () => dispatch(CartAction.emptyCart());
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  const handleDonePress = () => {
    emptyCart();
    navigation.navigate('DeliveryStatus');
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Colors.DEFAULT_WHITE,
      }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={Images.SUCCESS}
          resizeMode="contain"
          style={{width: 150, height: 150}}
        />
        <Text style={{marginTop: 10, fontSize: 30, lineHeight: 36}}>
          Hoàn thành!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 8,
            color: Colors.DARK_THREE,
            fontSize: 16,
            lineHeight: 22,
          }}>
          Đơn hàng của bạn đã được xác nhận!
        </Text>
      </View>
      <TextButton
        label="Xác nhận"
        buttonContainerStyle={{
          height: 55,
          marginBottom: 10,
          borderRadius: 30,
          backgroundColor: Colors.DEFAULT_GREEN,
        }}
        onPress={handleDonePress}
      />
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({});
