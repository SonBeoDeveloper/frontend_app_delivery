import axios from 'axios';
import {ApiContants} from '../contants';
import {authHeader} from '../untils/Generator';
import {getToken} from '../Store';

const AuthRequest = axios.create({
  baseURL: ApiContants.BACKEND_API.BASE_API_URL,
});
const register = async user => {
  if (
    !user?.fullname ||
    !user?.email ||
    !user?.password ||
    !user?.phone ||
    !user?.address
  ) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      fullname: user?.fullname,
      email: user?.email,
      password: user?.password,
      address: user?.address,
      phone: user?.phone,
    };
    console.log(
      'Sending request to:',
      ApiContants.BACKEND_API.BASE_API_URL + ApiContants.BACKEND_API.REGISTER,
    );
    let registerResponse = await AuthRequest.post(
      ApiContants.BACKEND_API.REGISTER,
      requestBody,
    );
    return registerResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};
const login = async user => {
  if (!user?.email || !user?.password) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      email: user?.email,
      password: user?.password,
    };
    let loginResponse = await AuthRequest.post(
      ApiContants.BACKEND_API.LOGIN,
      requestBody,
    );
    return loginResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};
const checkUserExist = async (type, value) => {
  try {
    let params = {[type]: value};
    let userCheckResponse = await AuthRequest.get(
      ApiContants.BACKEND_API.USER_EXITS,
      {params},
    );
    return userCheckResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const refreshToken = async (type, value) => {
  try {
    let tokenResponse = await AuthRequest.get(
      `${ApiContants.BACKEND_API.USER}/refresh`,
      {headers: authHeader(getToken())},
    );
    if (tokenResponse?.status === 200) {
      return {status: true, data: tokenResponse?.data?.data};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};
const forgotpasswordToken = async user => {
  if (!user?.email) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      email: user?.email,
    };
    let forgotpasswordResponse = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/forgot-password-token`,
      requestBody,
    );
    return forgotpasswordResponse?.data;
  } catch (error) {
    return {status: false, message: 'Oops! Something went wrong'};
  }
};
const resetPassword = async user => {
  if ((!user?.password, !user?.token)) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      password: user?.password,
      token: user?.token,
    };
    let forgotpasswordResponse = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/reset-password`,
      requestBody,
    );
    return forgotpasswordResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};
const resetPasswords = async user => {
  if ((!user?.password, !user?.email)) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      password: user?.password,
      email: user?.email,
    };
    let forgotpasswordResponse = await axios.put(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/reset-passwords`,
      requestBody,
    );
    return forgotpasswordResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};
const sentOTP = async email => {
  console.log(`userService | sentOTP`);
  try {
    let addressResponse = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}/twilio-verify/send-otp`,
      {email},
    );

    if (response?.status === 200) {
      return {status: true, data: addressResponse?.data};
    } else {
      return {
        status: false,
        message: `send otp error`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `send otp error`,
    };
  }
};
const verifyOTP = async user => {
  console.log(`userService | verifyOTP`);
  if ((!user?.phone, !user?.code)) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      phone: user?.phone,
      code: user?.code,
    };
    let addressResponse = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}/twilio-verify/verify-otp`,
      requestBody,
    );

    if (response?.status === 200) {
      return {status: true, data: addressResponse?.data};
    } else {
      return {
        status: false,
        message: `verify otp error`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `verify otp error`,
    };
  }
};
export default {
  register,
  checkUserExist,
  login,
  sentOTP,
  refreshToken,
  forgotpasswordToken,
  resetPassword,
  resetPasswords,
  verifyOTP,
};
