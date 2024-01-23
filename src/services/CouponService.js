import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../untils/Generator';
import {getToken} from '../Store';
const addCoupon = async name => {
  console.log(`CouponService | addCoupon`);
  if (!name) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.USER}/applyCoupon`,
      {name},
      {
        headers: authHeader(getToken()),
      },
    );

    if (response?.status === 200) {
      return {
        status: true,
        message: `Item added coupon successfully`,
        data: response?.data,
      };
    } else {
      return {
        status: false,
        message: `Item added coupon failed`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Item added to cart failed`,
    };
  }
};
export default {addCoupon};
