import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../contants';

const LineDivider = ({lineStyle}) => {
  return (
    <View
      style={{
        height: 2,
        width: '100%',
        backgroundColor: Colors.LIGHT_GREY,
        ...lineStyle,
      }}
    />
  );
};

export default LineDivider;

const styles = StyleSheet.create({});
