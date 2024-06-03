import {
  GET_CART_ERROR,
  GET_CART_FETCHING,
  GET_CART_SUCCESS,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
} from "../actions/shoppingCartActions";

const initialState = {
  cart: [],
  payment: {},
  address: {},
  isFetching: false, // fetching durumunu belirten alan
  error: null, // hata mesajını tutan alan
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    case GET_CART_FETCHING:
      return { ...state, isFetching: true, error: null };
    case GET_CART_SUCCESS:
      return { ...state, isFetching: false, cart: action.payload };
    case GET_CART_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};

export default shoppingCartReducer;
