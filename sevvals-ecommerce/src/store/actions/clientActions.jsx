import axiosInstance from "../../api/api";

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
