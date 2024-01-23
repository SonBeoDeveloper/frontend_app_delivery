import {CategoryService} from '../services';

const types = {
  GET_CATEGORY_ITEMS: 'GET_CATEGORY_ITEMS',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

const getCategoryItems = () => {
  return dispatch => {
    CategoryService.getCategoryData()
      .then(cartResponse => {
        dispatch({
          type: types.GET_CATEGORY_ITEMS,
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
export default {types, getCategoryItems};
