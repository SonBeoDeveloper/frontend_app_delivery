import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../untils/Generator';
import {getToken} from '../Store';
const getWishlist = async () => {
  try {
    const token = getToken();
    let WishlistResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/wishlist`,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    if (WishlistResponse?.status === 200) {
      return {
        status: true,
        message: `wishlist fetched`,
        data: WishlistResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `wishlist not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `wishlist data not found`,
    };
  }
};
const addWishlist = async ({productId}) => {
  console.log(`wishlisht | addWishlist`);
  try {
    let response = await axios.put(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.PRODUCTS}/wishlist`,
      {productId},
      {
        headers: authHeader(getToken()),
      },
    );

    if (response?.status === 200) {
      return {
        status: true,
        message: `Item added to Wishlist successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item added to Wishlist failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Item added to Wishlist failed`,
    };
  }
};

export default {getWishlist, addWishlist};
