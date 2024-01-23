import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../untils/Generator';
import {getToken} from '../Store';

const getCategoryData = async () => {
  console.log('CategoryService | getCategoryData');
  try {
    let response = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.CATEGORY}`,
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Category fetched`,
        data: response?.data,
      };
    } else {
      return {
        status: false,
        message: `Category not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Category not found`,
    };
  }
};

export default {getCategoryData};
