import GeneralReducer from './GeneralReducer';
import CategoryReducer from './CategoryReducer';
import CartReducer from './CartReducer';
import FoodReducer from './FoodReducer';
import WishlistReducer from './WishlistReducer';
import {combineReducers} from 'redux';
import HistoryReducer from './HistoryReducer';
import CouponReducer from './CouponReducer';
export default combineReducers({
  generalState: GeneralReducer,
  categoryState: CategoryReducer,
  wishlistState: WishlistReducer,
  couponState: CouponReducer,
  cartState: CartReducer,
  historyState: HistoryReducer,
  productState: FoodReducer,
});
