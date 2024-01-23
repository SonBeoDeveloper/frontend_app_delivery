import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Colors, Images} from '../contants';

const RadioButton = ({
  containerStyle,
  label,
  labelStyle,
  iconStyle,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Colors.SECONDARY_WHITE,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={isSelected ? Images.CORRECT : Images.CANCEL}
        style={{marginLeft: 5, width: 20, height: 20, ...iconStyle}}
      />
      <Text
        style={{
          marginLeft: 20,
          color: Colors.DEFAULT_GREY,
          fontSize: 16,
          lineHeight: 22,
          ...labelStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
