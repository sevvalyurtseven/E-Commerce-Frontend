import { toast } from "react-toastify";
import axiosInstance from "../../api/api";
import { resetCartAction, setCart } from "./shoppingCartActions";

// Action Type Constants:

export const SET_USER = "Kullanıcı bilgilerini ayarlamak için kullanılır";
export const SET_ROLES = "Kullanıcı rollerini ayarlamak için kullanılır";
export const SET_THEME =
  "Kullanıcının tema tercihlerini ayarlamak için kullanılır";
export const SET_LANGUAGE =
  "Kullanıcının dil tercihlerini ayarlamak için kullanılır";

// Fetch Constants:

export const GET_ROLES = "Rolleri getirmek için kullanılır";
export const GET_ROLES_FETCHING =
  "Roller fetch işlemi başlatıldığında kullanılır";
export const GET_ROLES_SUCCESS =
  "Roller fetch işlemi başarıyla tamamlandığında kullanılır";
export const GET_ROLES_ERROR =
  "Roller fetch işlemi başarısız olduğunda kullanılır";

//Login Action Type Constants:
export const LOGOUT_USER = "Kullanıcı cıkış yapmak için kullanılır";
export const LOGIN_REQUEST = "Login işlemi başlatıldığında kullanılır";
export const LOGIN_SUCCESS =
  "Login işlemi başarıyla tamamlandığında kullanılır";
export const LOGIN_FAILURE = "Login işlemi başarısız oldugunda kullanılır";

// Action Creators:

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const fetchRolesRequest = () => ({
  type: GET_ROLES_FETCHING,
});

export const fetchRolesSuccess = (roles) => ({
  type: GET_ROLES_SUCCESS,
  payload: roles,
});

export const fetchRolesError = (error) => ({
  type: GET_ROLES_ERROR,
  payload: error,
});

// Login Action Creators:
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutUser = () => ({ type: LOGOUT_USER });

// Async Action Creators:

// Thunk Action Creator:

export const fetchRoles = () => {
  return async (dispatch) => {
    dispatch(fetchRolesRequest());
    try {
      const response = await axiosInstance.get("/roles");
      dispatch(fetchRolesSuccess(response.data));
    } catch (error) {
      dispatch(fetchRolesError(error.message));
    }
  };
};

//Login Thunk Action Creator:

export const userLogin = (data) => {
  return (dispatch) => {
    dispatch(loginRequest());
    return axiosInstance
      .post("/login", data)
      .then((response) => {
        dispatch(loginSuccess(response.data));
        if (data.rememberMe) {
          localStorage.setItem("token", response.data.token);
        }

        // Kaydedilmiş sepeti yükle ve Redux state'ine ekle
        const savedCart = localStorage.getItem("savedCart");
        if (savedCart) {
          dispatch(setCart(JSON.parse(savedCart)));
          localStorage.removeItem("savedCart"); // Sepeti temizle
        }

        return response.data;
      })
      .catch((error) => {
        dispatch(loginFailure(error.response.data.message));
        throw error;
      });
  };
};

export const userLogout = () => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;
    localStorage.setItem("savedCart", JSON.stringify(cart)); // Sepeti kaydet

    dispatch(resetCartAction()); // Sepeti sıfırla
    dispatch(logoutUser());
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
  };
};
