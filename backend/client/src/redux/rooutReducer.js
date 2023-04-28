import { combineReducers } from "redux";
import reducer from "./reducer";
import productReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import totalReducer from "./totalReducer";

const rootReducer = combineReducers({
  reducer,
  productReducer,
  cartReducer,
  orderReducer,
  totalReducer,
});
export default rootReducer;
