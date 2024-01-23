import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Colors, Images} from '../contants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartItem = ({item, isSelected, onPress}) => {
  const [isChecked, setIsChecked] = useState(isSelected);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: isSelected ? Colors.DEFAULT_GREEN : Colors.LIGHT_GREEN,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderRadius: 30,
          borderColor: Colors.LIGHT_GREY,
        }}>
        <Image
          source={item.image}
          resizeMode="center"
          style={{
            width: 35,
            height: 35,
          }}
        />
      </View>
      <Text
        style={{
          flex: 1,
          marginLeft: 30,
          fontSize: 22,
          lineHeight: 22,
        }}>
        {item.name}
      </Text>

      <Image
        source={isSelected ? Images.CORRECT : Images.CANCEL}
        style={{width: 25, height: 25}}
      />
    </TouchableOpacity>
  );
};

export default CartItem;

const styles = StyleSheet.create({});
