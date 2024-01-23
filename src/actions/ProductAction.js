import {FoodService} from '../services';
import UserService from '../services/UserService';

const types = {
  GET_PRODUCT_ITEMS: 'GET_PRODUCT_ITEMS',
  SET_IS_LOADING: 'SET_IS_LOADING',
  GET_ALL_PRODUCT: 'GET_ALL_PRODUCT',
  SET_RATING: 'SET_RATING',
  SET_SELECTED_CATEGORY_INDEX: 'SET_SELECTED_CATEGORY_INDEX',
  GET_BY_CAT: 'GET_BY_CAT',
};
const getAllProduct = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    FoodService.getAllFood()
      .then(productResponse => {
        dispatch({
          type: types.GET_PRODUCT_ITEMS,
          payload: productResponse?.data,
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
const getProductItems = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    FoodService.getFood()
      .then(productResponse => {
        dispatch({
          type: types.GET_PRODUCT_ITEMS,
          payload: productResponse?.data,
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
const getFoodByCat = idCat => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });

    FoodService.getFoodByCat(idCat)
      .then(cartResponse => {
        dispatch({
          type: types.GET_BY_CAT,
          payload: cartResponse?.data,
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
    FoodService.getFoodByCat(idCat)
      .then(cartResponse => {
        dispatch({
          type: types.GET_BY_CAT,
          payload: cartResponse?.data,
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
const rating = user => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });

    UserService.rating(user)
      .then(cartResponse => {
        dispatch({
          type: types.SET_RATING,
          payload: cartResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
        dispatch(getAllProduct());
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};
export default {getProductItems, types, rating, getAllProduct, getFoodByCat};
