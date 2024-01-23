import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ApiContants, Colors, Fonts} from '../contants';
import {Display} from '../untils';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {CartAction} from '../actions';

const FoodCard = ({_id, name, description, price, images, navigate}) => {
  const dispatch = useDispatch();
  const itemCount = useSelector(
    state =>
      state?.cartState?.cart?.products?.find(item => item?.product?._id === _id)
        ?.count,
  );

  const addToCart = productId => dispatch(CartAction.addToCart({productId}));
  const removeFromCart = productId =>
    dispatch(CartAction.removeFromCart({productId}));
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
        <Image
          style={styles.image}
          source={{
            uri: images,
          }}
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
          <View style={styles.rowContainer}>
            <Text numberOfLines={1} style={styles.titleText}>
              {name}
            </Text>
          </View>
          <Text numberOfLines={2} style={styles.descriptionText}>
            {description}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.priceText}>{price}.000 vnđ</Text>
          <View style={styles.itemAddContainer}>
            {itemCount > 0 ? (
              <>
                <AntDesign
                  name="minus"
                  color={Colors.DEFAULT_YELLOW}
                  size={18}
                  onPress={() => removeFromCart(_id)}
                />
                <Text style={styles.itemCountText}>{itemCount}</Text>
              </>
            ) : null}

            <AntDesign
              name="plus"
              color={Colors.DEFAULT_YELLOW}
              size={18}
              onPress={() => addToCart(_id)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: Colors.LIGHT_GREY,
  },
  image: {
    height: 100,
    width: 100,
    margin: 6,
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: Display.setWidth(60),
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  descriptionText: {
    width: Display.setWidth(60),
    color: Colors.DARK_TWO,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 13,
    lineHeight: 10 * 1.4,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  priceText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 15,
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
});

export default FoodCard;
