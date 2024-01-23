import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../untils/Generator';
import {getToken} from '../Store';

const getAllFood = async () => {
  console.log('FoodService | getOneFoodById');
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.PRODUCTS}`,
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Food data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Food data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Food data not found`,
    };
  }
};
const getFood = async () => {
  console.log('FoodService | getOneFoodById');
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.PRODUCTS}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        message: `Food data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        message: `Food data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Food data not found`,
    };
  }
};
const getFoodByCat = async idCat => {
  console.log(`FoodService | getFoodByCat`);
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.PRODUCTS}/productsByCategory/${idCat}`,
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `get food by cat successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `get food by cat failed`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Item removed from failed`,
    };
  }
};
export default {getAllFood, getFood, getFoodByCat};
