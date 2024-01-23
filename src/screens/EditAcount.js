import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import UserService from '../services/UserService';
import {useDispatch} from 'react-redux';
import {WishlistAction} from '../actions';
import {Separator, ToggleButton} from '../components';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '../contants';
import {Display} from '../untils';
const EditAccount = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      UserService.getUserData().then(response => {
        if (response?.status) {
          setUser(response?.data);
          setFullname(response?.data?.fullname || '');
          setAddress(response?.data?.address || '');
          setPhone(response?.data?.phone || '');
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  const handleFullnameChange = text => {
    setFullname(text);
  };

  const handleAddressChange = text => {
    setAddress(text);
  };

  const handlePhoneChange = text => {
    setPhone(text);
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const updatedUser = {
      fullname: fullname,
      address: address,
      phone: phone,
    };

    dispatch(WishlistAction.editUser(updatedUser));
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />

      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Thông tin User</Text>
      </View>
      <Text>Fullname:</Text>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={handleFullnameChange}
      />
      <Text>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={handleAddressChange}
      />
      <Text>Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={handlePhoneChange}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
  },
  input: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditAccount;
