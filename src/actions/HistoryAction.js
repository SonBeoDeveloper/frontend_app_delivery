import {CartService} from '../services';

const types = {
  GET_HISTORY: 'GET_HISTORY',
  SET_IS_LOADING: 'SET_IS_LOADING',
};
const getHistory = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    CartService.getHistory()
      .then(historyResponse => {
        dispatch({
          type: types.GET_HISTORY,
          payload: historyResponse?.data,
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
export default {types, getHistory};
