import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Images} from '../contants';
import {Image} from 'react-native-elements';
import {
  FormInput,
  FormInputCheck,
  RadioButton,
  TextButton,
} from '../components';
import {validateInput} from '../untils';
const AddCard = ({navigation, route}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberErr, setCardNumberErr] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNameError, setcardNameError] = useState('');

  const [expiryDate, setExpiryDate] = useState('');
  const [expiryDateErr, setExpiryDateErr] = useState('');
  const [cvv, setCvv] = useState('');
  const [cvvErr, setCvvErr] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  useEffect(() => {
    let {selectedCard} = route.params;
    setSelectedCard(selectedCard);
  }, []);
  function Header() {
    return (
      <View
        style={{
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Add New Card</Text>
      </View>
    );
  }
  function renderCard() {
    return (
      <ImageBackground
        source={Images.CARD}
        style={{
          height: 200,
          width: '100%',
          marginTop: '20',

          overflow: 'hidden',
        }}>
        <Image
          source={selectedCard?.image}
          resizeMode="contain"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            height: 40,
            width: 80,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              color: Colors.DEFAULT_WHITE,
              fontSize: 18,
              lineHeight: 20,

              fontWeight: 'bold',
            }}>
            {cardName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                color: Colors.DEFAULT_WHITE,
                fontSize: 18,
                lineHeight: 20,

                fontWeight: '300',
              }}>
              {cardNumber}
            </Text>
            <Text
              style={{
                color: Colors.DEFAULT_WHITE,
                fontSize: 18,
                lineHeight: 20,
                fontWeight: '300',
              }}>
              {expiryDate}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
  function renderForm() {
    return (
      <View style={{marginTop: 20}}>
        <FormInput
          label="Cardholder Name"
          keyboardType="number-pad"
          value={cardNumber}
          maxLength={19}
          onChange={value => {
            setCardNumber(
              value
                .replace(/\s/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim(),
            );
            validateInput(value, 19, setCardNumberErr);
          }}
          errorMsg={cardNumberErr}
          appendComponent={
            <FormInputCheck value={cardNumber} error={cardNumberErr} />
          }
        />
        <FormInput
          label="Cardholder Name"
          value={cardName}
          containerStyle={{marginTop: 10}}
          onChange={value => {
            validateInput(value, 1, setcardNameError);
            setCardName(value);
          }}
          errorMsg={cardNameError}
          appendComponent={
            <FormInputCheck value={cardName} error={cardNameError} />
          }
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <FormInput
            label="Expiry Date "
            value={expiryDate}
            placeholder="MM/YY"
            maxLength={5}
            containerStyle={{flex: 1}}
            onChange={value => {
              validateInput(value, 5, setExpiryDateErr);
              setExpiryDate(value);
            }}
            appendComponent={
              <FormInputCheck value={expiryDate} error={expiryDateErr} />
            }
          />
          <FormInput
            label="CVV"
            value={cvv}
            maxLength={3}
            containerStyle={{flex: 1, marginLeft: 30}}
            onChange={value => {
              validateInput(value, 3, setCvvErr);
              setCvv(value);
            }}
            appendComponent={<FormInputCheck value={cvv} error={cvvErr} />}
          />
        </View>
        <View style={{alignItems: 'flex-start', marginTop: 10}}>
          <RadioButton
            label="Remember this card detail."
            isSelected={isRemember}
            onPress={() => setIsRemember(!isRemember)}
          />
        </View>
      </View>
    );
  }
  function isEnableAddCard() {
    return (
      cardNumber != '' &&
      cardName != '' &&
      expiryDate != '' &&
      cvv != '' &&
      cardNameError == '' &&
      cardNumberErr == '' &&
      expiryDateErr == '' &&
      cvvErr == ''
    );
  }
  function renderFooter() {
    return (
      <View
        style={{
          paddingTop: 30,
          paddingBottom: 10,
          paddingHorizontal: 10,
        }}>
        <TextButton
          disabled={!isEnableAddCard()}
          label="add Card"
          buttonContainerStyle={{
            height: 60,
            borderRadius: 30,
            backgroundColor: isEnableAddCard()
              ? Colors.DEFAULT_GREEN
              : Colors.LIGHT_GREEN,
          }}
          onPress={() => navigation.goBack()}></TextButton>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: Colors.DEFAULT_WHITE}}>
      {Header()}
      {Header()}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
        }}>
        {renderCard()}
        {renderForm()}
      </KeyboardAwareScrollView>
      {renderFooter()}
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({});
