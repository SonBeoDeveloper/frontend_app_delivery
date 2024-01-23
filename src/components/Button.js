import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../contants';
const PrimaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const SecondaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={{...styles.btnContainer, backgroundColor: Colors.DEFAULT_WHITE}}>
        <Text style={{...styles.title, color: Colors.DEFAULT_GREEN}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export {SecondaryButton, PrimaryButton};

const styles = StyleSheet.create({
  title: {color: Colors.DEFAULT_WHITE, fontWeight: 'bold', fontSize: 18},
  btnContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
