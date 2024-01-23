import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Colors, Images} from '../contants';

const FormInputCheck = ({value, error}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Colors.SECONDARY_WHITE,
      }}>
      <Image
        source={
          value == '' || (value != '' && error == '')
            ? Images.CORRECT
            : Images.CANCEL
        }
        style={{
          height: 20,
          width: 20,
          tintColor:
            value == ''
              ? Colors.DEFAULT_GREY
              : value != '' && error == ''
              ? Colors.DEFAULT_GREEN
              : Colors.DEFAULT_RED,
        }}
      />
    </View>
  );
};

export default FormInputCheck;

const styles = StyleSheet.create({});
