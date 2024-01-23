import {CouponService} from '../services';
import CartAction from './CartAction';
import Toast from 'react-native-toast-message';
const types = {
  SET_IS_LOADING: 'SET_IS_LOADING',
  ADD_COUPON: 'ADD_COUPON',
  SHOW_TOAST: 'SHOW_TOAST',
};
const addCoupon = name => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    CouponService.addCoupon(name)
      .then(wishlistResponse => {
        dispatch({
          type: types.ADD_COUPON,
          payload: wishlistResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
        dispatch(CartAction.getCartItems());
        Toast.show({
          type: 'success',
          text1: 'Đăng ký thành công!',
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
        Toast.show({
          type: 'error',
          text1: 'Đăng ký thất bại! Vui lòng thử lại.',
          position: 'bottom',
          visibilityTime: 3000,
          autoHide: true,
        });
      });
  };
};

export default {types, addCoupon};
