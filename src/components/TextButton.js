import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../contants';

const TextButton = ({
  buttonContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  label2 = '',
  label2Style,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.DEFAULT_GREEN,
        ...buttonContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={{
          color: Colors.DEFAULT_WHITE,
          fontSize: 20,
          lineHeight: 22,
          ...labelStyle,
        }}>
        {label}
      </Text>
      {label2 != '' && (
        <Text
          style={{
            flex: 1,
            textAlign: 'right',
            color: Colors.DEFAULT_WHITE,
            fontSize: 20,
            lineHeight: 22,
            ...label2Style,
          }}>
          {label2}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
