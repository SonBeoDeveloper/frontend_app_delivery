import {CategoryAction} from '../actions';

const initialState = {
  category: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CategoryAction.types.GET_CATEGORY_ITEMS:
      return {...state, category: action?.payload.data};
    case CategoryAction.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};
