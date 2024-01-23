import {CouponAction} from '../actions';

const initialState = {
  isLoading: false,
  couponData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CouponAction.types.ADD_COUPON:
      return {...state, couponData: action?.payload};
    case CouponAction.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};
