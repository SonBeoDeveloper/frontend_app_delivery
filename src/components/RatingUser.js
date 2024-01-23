import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Images} from '../contants';

const Rating = ({
  rating,
  iconStyle,
  activeColor = Colors.DEFAULT_YELLOW,
  innactiveColor = Colors.LIGHT_YELLOW,
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {Array.from({length: 5}).map((_, index) => (
        <Text
          key={index}
          style={{
            ...styles.starText,
            color: rating > index ? activeColor : innactiveColor,
          }}>
          ★
        </Text>
      ))}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  starText: {fontSize: 20},
});
