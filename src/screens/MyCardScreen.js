import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, dummyData} from '../contants';
import {Display} from '../untils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CartItem, TextButton} from '../components';
import {useDispatch, useSelector} from 'react-redux';

const MyCardScreen = ({navigation, route}) => {
  const cartData = route.params.cartData;
  const item = route.params;
  const [selectedCard, setSelectedCard] = useState(null);
  function renderHeader() {
    return (
      <View
        style={{
          paddingVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Phương thức trả phí
        </Text>
      </View>
    );
  }
  function renderMycards() {
    return (
      <View>
        {dummyData.CARD_TYPES.MY_CARD.map((item, index) => {
          return (
            <CartItem
              key={`Mycard -${item.id}`}
              item={item}
              isSelected={
                `${selectedCard?.key} - ${selectedCard?.id}` ==
                `Mycard - ${item.id}`
              }
              onPress={() => {
                setSelectedCard({...item, key: 'Mycard'});
              }}
            />
          );
        })}
      </View>
    );
  }
  function renderAddNewCard() {
    return (
      <View style={{marginTop: 10}}>
        <Text
          style={{
            fontSize: 18,
            lineHeight: 20,
            fontFamily: Fonts.POPPINS_MEDIUM,
            fontWeight: 'bold',
          }}>
          Thêm thẻ
        </Text>
        {dummyData.CARD_TYPES.ALL_CARD.map((item, index) => {
          return (
            <TouchableOpacity>
              <CartItem
                key={`NewCard -${item.id}`}
                item={item}
                isSelected={
                  `${selectedCard?.key} - ${selectedCard?.id}` ==
                  `NewCard - ${item.id}`
                }
                onPress={() => {
                  setSelectedCard({...item, key: 'NewCard'});
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
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
          disabled={selectedCard == null}
          buttonContainerStyle={{
            height: 60,
            borderRadius: 30,
            backgroundColor:
              selectedCard == null ? Colors.DEFAULT_GREY : Colors.DEFAULT_GREEN,
          }}
          label={selectedCard?.key == 'NewCard' ? 'Add' : 'Xác nhận'}
          onPress={() => {
            if (selectedCard?.key == 'NewCard') {
              navigation.navigate('AddCard', {
                selectedCard: selectedCard,
                cartData: cartData,
              });
            } else {
              navigation.navigate('Checkout', {
                selectedCard: selectedCard,
                cartData: cartData,
              });
            }
          }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.DEFAULT_WHITE}}>
      {renderHeader()}
      <ScrollView
        style={{
          flexGrow: 1,
          marginTop: 30,
          paddingHorizontal: 10,
          paddingBottom: 30,
        }}>
        {renderMycards()}
        {renderAddNewCard()}
      </ScrollView>
      {renderFooter()}
    </SafeAreaView>
  );
};

export default MyCardScreen;

const styles = StyleSheet.create({
  cartButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: Display.setHeight(6),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cartButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});
