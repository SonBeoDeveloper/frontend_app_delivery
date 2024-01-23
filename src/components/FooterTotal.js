import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../contants';
import LineDivider from './LineDivider';
import TextButton from './TextButton';
const FooterTotal = ({subTotal, shippingFee, total, onPress, disabled}) => {
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[Colors.DEFAULT_WHITE, Colors.LIGHT_GREY]}
        style={{
          position: 'absolute',
          top: -15,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 200 : 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View
        style={{
          padding: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: Colors.DEFAULT_WHITE,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, fontSize: 18, lineHeight: 20}}>
            Giá toàn bộ sản phẩm:
          </Text>
          <Text style={{fontSize: 18, lineHeight: 20}}>
            {subTotal.toFixed(1)}00 VNĐ
          </Text>
        </View>

        <LineDivider />
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{flex: 1, fontSize: 22, lineHeight: 30}}>Tổng thu:</Text>
          <Text style={{fontSize: 22, lineHeight: 30}}>{total}00 VNĐ</Text>
        </View>
        <TextButton
          disabled={disabled}
          buttonContainerStyle={{
            height: 60,
            marginTop: 10,
            borderRadius: 30,
            backgroundColor: Colors.DEFAULT_GREEN,
          }}
          label="Xác nhận đơn hàng"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default FooterTotal;

const styles = StyleSheet.create({});
