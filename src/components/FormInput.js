import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import React from 'react';
import {Colors} from '../contants';
const {width, height} = Dimensions.get('window');
const FormInput = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholder,
  inputStyle,
  value = '',
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{color: Colors.DEFAULT_GREY, fontSize: 14, lineHeight: 22}}>
          {label}
        </Text>
        <Text style={{color: Colors.DEFAULT_RED, fontSize: 14, lineHeight: 22}}>
          {errorMsg}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: height > 800 ? 55 : 45,
          paddingHorizontal: 10,
          marginTop: height > 800 ? 8 : 0,
          borderRadius: 30,
          backgroundColor: Colors.LIGHT_GREY,
        }}>
        {prependComponent}
        <TextInput
          style={{flex: 1}}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.DEFAULT_GREY}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          onChangeText={text => onChange(text)}
        />
        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
