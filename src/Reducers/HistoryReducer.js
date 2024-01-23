import {HistoryAction} from '../actions';

const initialState = {
  history: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HistoryAction.types.GET_HISTORY:
      return {...state, history: action?.payload};
    case HistoryAction.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};
