import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../untils/Generator';
import {getToken} from '../Store';

const getUserData = async () => {
  try {
    console.log('UserService | getOneFoodById');
    const token = getToken();
    console.log(token);
    let userResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/get-user`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (userResponse?.status === 200) {
      return {
        status: true,
        message: `User data fetched`,
        data: userResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `User data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `User data not found`,
    };
  }
};
const editUser = async user => {
  if (!user?.fullname || !user?.phone || !user?.address) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      fullname: user?.fullname,
      address: user?.address,
      phone: user?.phone,
    };
    let registerResponse = await axios.put(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/edit`,
      requestBody,
      {
        headers: authHeader(getToken()),
      },
    );
    if (registerResponse.status === 200) {
      return {status: true, data: registerResponse?.data?.data};
    } else {
      return {
        status: false,
        message: `User update failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `User update failed`,
    };
  }
};

const changeAddress = async address => {
  console.log(`userService | changeAddress`);
  try {
    let addressResponse = await axios.put(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/save-address`,
      {address},
      {
        headers: authHeader(getToken()),
      },
    );
    console.log(response?.data?.data);

    if (response?.status === 200) {
      return {status: true, data: addressResponse?.data?.data};
    } else {
      return {
        status: false,
        message: `Item added to address failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Item added to address failed`,
    };
  }
};

const rating = async user => {
  if (!user?.star || !user?.comment || !user?.productId) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      star: user?.star,
      comment: user?.comment,
      productId: user?.productId,
    };

    let orderResponse = await axios.put(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.PRODUCTS}/rating`,
      requestBody,
      {
        headers: authHeader(getToken()),
      },
    );
    return orderResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};
const addCoupon = async ({name}) => {
  console.log(`userService | addCoupon`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/applyCoupon`,
      {name},
      {
        headers: authHeader(getToken()),
      },
    );

    if (response?.status === 200) {
      return response?.data;
    } else {
      return {
        status: false,
        message: `Item added to Coupon failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Item added to Coupon failed`,
    };
  }
};
export default {
  getUserData,
  changeAddress,
  rating,
  addCoupon,
  editUser,
};
