import axiosInstance from "../../api/api";

// Action Type Constants:

export const SET_CART = "Sepet içeriğini ayarlar";
export const SET_PAYMENT = "Ödeme bilgilerini ayarlar";
export const SET_ADDRESS = "Adres bilgilerini ayarlar";

// Fetch Constants:

export const GET_CART = "Sepeti getirmek için kullanılır";
export const GET_CART_FETCHING =
  "Sepet fetch işlemi başlatıldığında kullanılır";
export const GET_CART_SUCCESS =
  "Sepet fetch işlemi başarıyla tamamlandığında kullanılır";
export const GET_CART_ERROR =
  "Sepet fetch işlemi başarısız olduğunda kullanılır";

// Action Creators:

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const fetchCartRequest = () => ({
  type: GET_CART_FETCHING,
});

export const fetchCartSuccess = (cart) => ({
  type: GET_CART_SUCCESS,
  payload: cart,
});

export const fetchCartError = (error) => ({
  type: GET_CART_ERROR,
  payload: error,
});

// Async Action Creators:

// Thunk Action Creator:

export const fetchCart = () => {
  return async (dispatch) => {
    dispatch(fetchCartRequest());
    try {
      const response = await axiosInstance.get("/cart");
      dispatch(fetchCartSuccess(response.data));
    } catch (error) {
      dispatch(fetchCartError(error.message));
    }
  };
};
