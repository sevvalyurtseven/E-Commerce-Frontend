import axiosInstance from "../../api/api";

// Action Type Constants:

export const SET_CART = "Sepet içeriğini ayarlar";
export const SET_PAYMENT = "Ödeme bilgilerini ayarlar";
export const SET_ADDRESS = "Adres bilgilerini ayarlar";
export const ADD_TO_CART = "Sepete ekleme işlemi";
export const INCREASE_QUANTITY = "Sepetteki ürün miktarını artırma işlemi";
export const DECREASE_QUANTITY = "Sepetteki ürün miktarını azaltma işlemi";
export const REMOVE_FROM_CART = "Sepetten ürün çıkarma işlemi";
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

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});
export const increaseQuantity = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: productId,
});

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
});

export const removeItem = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
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
