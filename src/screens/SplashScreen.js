/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Images, Fonts} from '../contants';
import {Display} from '../untils';
const SplashScreen = ({navigation}) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('Welcome');
  //   }, 2000);
  // }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Image source={Images.PLATE} resizeMode="contain" style={styles.images} />
      <Text style={styles.titleText}>Nhà hàng Thiên Anh</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_GREEN,
  },
  images: {
    width: Display.setWidth(60),
    height: Display.setHeight(30),
  },
  titleText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 30,
    fontFamily: Fonts.POPPINS_LIGHT,
  },
});
