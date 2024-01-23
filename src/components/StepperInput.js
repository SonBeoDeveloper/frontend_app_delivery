import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../contants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const StepperInput = ({containerStyle, value = 1, onAdd, onMinus}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        width: 130,
        backgroundColor: Colors.LIGHT_GREY2,
        borderRadius: 25,
        ...containerStyle,
      }}>
      <View
        style={{
          paddingLeft: 10,
          width: 40,
          alignItems: 'baseline',
          justifyContent: 'center',
        }}>
        <AntDesign
          name="minuscircleo"
          size={25}
          style={{
            color: value > 0 ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY,
          }}
          onPress={onMinus}
        />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 22, lineHeight: 30}}>{value}</Text>
      </View>
      <View
        style={{width: 50, alignItems: 'baseline', justifyContent: 'center'}}>
        <AntDesign
          name="pluscircleo"
          size={25}
          style={{
            color: value > 0 ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY,
          }}
          onPress={onAdd}
        />
      </View>
    </View>
  );
};

export default StepperInput;

const styles = StyleSheet.create({});
