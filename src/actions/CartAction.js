import {CartService, OrderService} from '../services';
import UserService from '../services/UserService';
const types = {
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  SET_IS_LOADING: 'SET_IS_LOADING',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  EMPTY_CART: 'EMPTY_CART',
  GET_HISTORY: 'GET_HISTORY',
  CASH_ORDER: 'CASH_ORDER',
  HISTORY_ORDER: 'HISTORY_ORDER',
  CHANGE_ADDRESS: 'CHANGE_ADDRESS',
  CONFIRM: 'CONFIRM',
  GET_CONFIRM: 'GET_CONFIRM',
};
const getCartItems = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    CartService.getCartItems()
      .then(cartResponse => {
        dispatch({
          type: types.GET_CART_ITEMS,
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
const getConfirmOrder = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    OrderService.getConfirmOrder()
      .then(cartResponse => {
        dispatch({
          type: types.GET_CONFIRM,
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
const addToCart = ({productId}) => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    CartService.addToCart({productId})
      .then(cartResponse => {
        dispatch({
          type: types.ADD_TO_CART,
          payload: cartResponse?.data,
        });

        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
        dispatch(getCartItems());
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const confirmOrderReceived = ({orderId}) => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    OrderService.receiveOrder({orderId})
      .then(cartResponse => {
        dispatch({
          type: types.CONFIRM,
          payload: cartResponse?.data,
        });
        dispatch(getConfirmOrder());
        dispatch({
          type: types.SET_IS_LOADING,
          payload: true,
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
const changeAddress = address => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    UserService.changeAddress(address)
      .then(cartResponse => {
        dispatch({
          type: types.CHANGE_ADDRESS,
          payload: cartResponse?.data,
        });
        dispatch(CartAction.changeAddress(address));
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
const removeFromCart = ({productId}) => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    CartService.removeFromCart({productId})
      .then(cartResponse => {
        dispatch({
          type: types.REMOVE_FROM_CART,
          payload: cartResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
        dispatch(getCartItems());
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const emptyCart = () => {
  return async dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });

    try {
      const cartResponse = await CartService.emptyCart();

      dispatch({
        type: types.EMPTY_CART,
        payload: cartResponse?.data,
      });

      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });

      dispatch(getCartItems());
    } catch (error) {
      console.error(`Error emptying cart: ${error.message}`);
      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });
    }
  };
};

const cashOrder = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    OrderService.cashOrderService()
      .then(cartResponse => {
        dispatch({
          type: types.CASH_ORDER,
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
const getHistoryOrder = () => {
  return dispatch => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    OrderService.getHistoryOrder()
      .then(cartResponse => {
        dispatch({
          type: types.HISTORY_ORDER,
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
export default {
  types,
  removeFromCart,
  getCartItems,
  cashOrder,
  getHistoryOrder,
  addToCart,
  emptyCart,
  changeAddress,
  confirmOrderReceived,
  getConfirmOrder,
};
