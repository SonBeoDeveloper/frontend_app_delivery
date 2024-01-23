import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Images} from '../contants';

const TextIconButton = ({
  containerStyle,
  label,
  labelStyle,
  icon,
  iconPosition,
  iconStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      {iconPosition == 'LEFT' && (
        <Image source={icon} style={{...styles.Images, ...iconStyle}} />
      )}
      <Text style={{...labelStyle, fontSize: 16, lineHeight: 22}}>{label}</Text>
      {iconPosition == 'RIGHT' && (
        <Image source={icon} style={{...styles.Images, ...iconStyle}} />
      )}
    </TouchableOpacity>
  );
};

export default TextIconButton;

const styles = StyleSheet.create({});
