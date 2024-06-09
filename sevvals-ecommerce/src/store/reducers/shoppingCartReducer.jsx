import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  GET_CART_ERROR,
  GET_CART_FETCHING,
  GET_CART_SUCCESS,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
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

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    case ADD_TO_CART: {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (existingProductIndex >= 0) {
        const newCart = state.cart.slice();
        newCart[existingProductIndex].count += 1;
        return {
          ...state,
          cart: newCart,
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          { count: 1, checked: true, product: action.payload },
        ],
      };
    }
    case INCREASE_QUANTITY: {
      const newCart = state.cart.map((item) =>
        item.product.id === action.payload
          ? { ...item, count: item.count + 1 }
          : item
      );
      return {
        ...state,
        cart: newCart,
      };
    }
    case DECREASE_QUANTITY: {
      const newCart = state.cart.map((item) =>
        item.product.id === action.payload && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      );
      return {
        ...state,
        cart: newCart,
      };
    }
    case REMOVE_FROM_CART: {
      const newCart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
      return {
        ...state,
        cart: newCart,
      };
    }
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
