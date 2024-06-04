import {
  GET_ROLES_ERROR,
  GET_ROLES_FETCHING,
  GET_ROLES_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  SET_LANGUAGE,
  SET_ROLES,
  SET_THEME,
  SET_USER,
} from "../actions/clientActions";

const initialState = {
  user: {
    name: null,
    email: null,
    token: null,
    role_id: null,
  },
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "",
  language: "",
  isFetching: false, // fetching durumunu belirten alan
  error: null, // hata mesajını tutan alan
  isLoggedIn: false, // kullanıcı giriş yapmış mı?
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, isLoggedIn: true };
    case LOGIN_REQUEST:
      return { ...state, isFetching: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    case LOGOUT_USER:
      return {
        ...state,
        user: {
          name: null,
          email: null,
          token: null,
          role_id: null,
        },
        isLoggedIn: false,
      };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case GET_ROLES_FETCHING:
      return { ...state, isFetching: true, error: null };
    case GET_ROLES_SUCCESS:
      return { ...state, isFetching: false, roles: action.payload };
    case GET_ROLES_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};
