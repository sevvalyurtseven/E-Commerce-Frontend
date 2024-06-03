import { combineReducers } from "redux";
import { clientReducer } from "./clientReducer";
import { productReducer } from "./productReducer";
import { shoppingCartReducer } from "./shoppingCartReducer";

export const reducers = combineReducers({
  clients: clientReducer,
  products: productReducer,
  shoppingCart: shoppingCartReducer,
});
