import {
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_FETCHING,
  GET_CATEGORIES_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_FETCHING,
  GET_PRODUCTS_SUCCESS,
  SET_CATEGORIES,
  SET_FETCH_STATE,
  SET_FILTER,
  SET_LIMIT,
  SET_OFFSET,
  SET_PRODUCT_LIST,
  SET_TOTAL,
} from "../actions/productActions";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  isFetching: false, // fetching durumunu belirten alan
  error: null, // hata mesajını tutan alan
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case GET_PRODUCTS_FETCHING:
      return { ...state, isFetching: true, error: null };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        productList: action.payload.products,
        total: action.payload.total,
      };
    case GET_PRODUCTS_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    case GET_CATEGORIES_FETCHING:
      return { ...state, isFetching: true, error: null };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    case GET_CATEGORIES_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};
