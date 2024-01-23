import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../untils/Generator';
import {getToken} from '../Store';

const getOrder = async () => {
  try {
    console.log('OrderService | getOrder');
    const token = getToken();
    let orderResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/get-order`,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    if (orderResponse?.status === 200) {
      return {
        status: true,
        message: `order fetched`,
        data: orderResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `order not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `order data not found`,
    };
  }
};
const receiveOrder = async ({orderId}) => {
  console.log(`OrderService | receiveOrder`);
  try {
    let response = await axios.patch(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/receiveOrder/${orderId}`,
    );

    if (response?.status === 200) {
      return {
        status: true,
        message: `Item added to cart successfully`,
        data: response?.data,
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
const getConfirmOrder = async () => {
  console.log('OrderService | getConfirmOrder');
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/confirmOrder`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Order fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Order not found`,
      };
    }
  } catch (error) {
    return {
      message: `Order not found`,
      status: false,
    };
  }
};
const getHistoryOrder = async () => {
  try {
    console.log('OrderService | getHistoryOrder');
    const token = getToken();
    let orderResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/get-order-history`,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    if (orderResponse?.status === 200) {
      return {
        status: true,
        message: `order fetched`,
        data: orderResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `order not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `order data not found`,
    };
  }
};
const cashOrderService = async () => {
  try {
    let orderData = {
      COD: true,
      couponApplied: true,
    };
    const response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/cart/cash-order`,
      orderData,
      {
        headers: authHeader(getToken()),
      },
    );
    return response?.data;
  } catch (error) {
    console.error('Error in cashOrderService:', error);
    throw error;
  }
};
export default {
  getOrder,
  cashOrderService,
  getHistoryOrder,
  getConfirmOrder,
  receiveOrder,
};
