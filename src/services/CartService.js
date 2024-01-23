import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../untils/Generator';
import {getToken} from '../Store';

const getCartItems = async () => {
  console.log('CartService | getCartItem');
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CART}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Cart fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Cart not found`,
      };
    }
  } catch (error) {
    return {
      message: `Cart not found`,
      status: false,
    };
  }
};

const addToCart = async ({productId}) => {
  console.log(`CartService | addToCart`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/add-to-cart`,
      {productId},
      {
        headers: authHeader(getToken()),
      },
    );

    if (response?.status === 200) {
      return {
        status: true,
        message: `Item added to cart successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item added to cart failed`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Item added to cart failed`,
    };
  }
};

const removeFromCart = async ({productId}) => {
  console.log(`CartService | removeFromCart`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/removeFromCart`,
      {productId},
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item removed from cart successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item removed from failed`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Item removed from failed`,
    };
  }
};
const emptyCart = async () => {
  console.log(`CartService | emptyFromCart`);
  try {
    const response = await axios.delete(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/empty-cart`,
      {
        headers: authHeader(getToken()),
      },
    );

    if (response && response.status === 200) {
      return {
        status: true,
        message: `Item removed from cart successfully`,
        data: response?.data,
      };
    } else {
      return {
        status: false,
        message: `Item removal from cart failed`,
      };
    }
  } catch (error) {
    console.error(`Error removing item from cart: ${error?.message}`);
    return {
      status: false,
      message: `Item removal from cart failed`,
    };
  }
};

export default {
  getCartItems,
  addToCart,
  removeFromCart,
  emptyCart,
};
