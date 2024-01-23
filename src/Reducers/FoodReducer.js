import {ProductAction} from '../actions';

const initialState = {
  product: {},
  isLoading: false,
  productCat: {},
  selectedCategoryIndex: -1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ProductAction.types.SET_RATING:
      return state;
    case ProductAction.types.GET_PRODUCT_ITEMS:
      return {...state, product: action?.payload};
    case ProductAction.types.GET_BY_CAT:
      return {...state, productCat: action?.payload};
    case ProductAction.types.GET_ALL_PRODUCT:
      return {...state, product: action?.payload};
    case ProductAction.types.SET_SELECTED_CATEGORY_INDEX:
      return {...state, selectedCategoryIndex: action.payload};
    case ProductAction.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};
