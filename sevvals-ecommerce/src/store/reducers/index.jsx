import { combineReducers } from "redux";
import { clientReducer } from "./clientReducer";
import { productReducer } from "./productReducer";
import { shoppingCartReducer } from "./shoppingCartReducer";

const reducers = combineReducers({
  client: clientReducer,
  products: productReducer,
  shoppingCart: shoppingCartReducer,
});
export default reducers;
