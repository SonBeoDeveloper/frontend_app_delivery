import {WishlistAction} from '../actions';

const initialState = {
  wishlist: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WishlistAction.types.ADD_TO_WISHLIST:
      return state;
    case WishlistAction.types.EDIT_USER:
      return state;
    case WishlistAction.types.GET_TO_WISHLIST:
      return {...state, cart: action?.payload};
    case WishlistAction.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};
