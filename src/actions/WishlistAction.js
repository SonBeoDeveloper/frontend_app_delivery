import {WishlistService} from '../services';
import UserService from '../services/UserService';
import GeneralAction from './GeneralAction';
import ProductAction from './ProductAction';

const types = {
  SET_IS_LOADING: 'SET_IS_LOADING',
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  GET_TO_WISHLIST: 'GET_TO_WISHLIST',
  EDIT_USER: 'EDIT_USER',
};
const getFromWishlist = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    WishlistService.getWishlist()
      .then(wishlistResponse => {
        dispatch({
          type: types.GET_TO_WISHLIST,
          payload: wishlistResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};
const addToWishlist = ({productId}) => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    WishlistService.addWishlist({productId})
      .then(wishlistResponse => {
        dispatch({
          type: types.ADD_TO_WISHLIST,
          payload: wishlistResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
        dispatch(getFromWishlist());
        dispatch(GeneralAction.setUserData());
        dispatch(ProductAction.getAllProduct());
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};
const editUser = user => {
  return async dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    console.log(user);
    UserService.editUser(user)
      .then(wishlistResponse => {
        dispatch({
          type: types.EDIT_USER,
          payload: wishlistResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
        dispatch(GeneralAction.setUserData());
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};
export default {types, addToWishlist, getFromWishlist, editUser};
