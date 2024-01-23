import {CartAction} from '../actions';
import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
export const resetState = createAction('Reset_all');

const initialState = {
  cart: {},
  isLoading: false,
  history: {},
  historyOrder: {},
  confirm: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CartAction.types.ADD_TO_CART:
      return state;
    case CartAction.types.REMOVE_FROM_CART:
      return state;
    case CartAction.types.EMPTY_CART:
      return state;
    case CartAction.types.CASH_ORDER:
      return state;
    case CartAction.types.CONFIRM:
      return state;
    case CartAction.types.CHANGE_ADDRESS:
      return state;
    case CartAction.types.HISTORY_ORDER:
      return {...state, historyOrder: action?.payload};
    case CartAction.types.GET_CART_ITEMS:
      return {...state, cart: action?.payload};
    case CartAction.types.GET_CONFIRM:
      return {...state, confirm: action?.payload};
    case CartAction.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};
