import axiosInstance from "../../api/api";

// Action Type Constants:

export const SET_CART = "Sepet içeriğini ayarlar";
export const SET_PAYMENT = "Ödeme bilgilerini ayarlar";
export const SET_ADDRESS = "Adres bilgilerini ayarlar";
export const ADD_ADDRESS = "Adres ekleme işlemi";
export const UPDATE_ADDRESS = "Adres bilgilerini güncelleme işlemi";
export const DELETE_ADDRESS = "Adres bilgilerini silme işlemi";
export const ADD_TO_CART = "Sepete ekleme işlemi";
export const INCREASE_QUANTITY = "Sepetteki ürün miktarını artırma işlemi";
export const DECREASE_QUANTITY = "Sepetteki ürün miktarını azaltma işlemi";
export const REMOVE_FROM_CART = "Sepetten ürün çıkarma işlemi";
export const TOGGLE_ITEM_SELECTION = "Sepetteki ürün seçimi işlemi";
export const LOAD_CART_FROM_STORAGE = "Sepet içeriğini yükleme işlemi";

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

export const addAddress = (address) => ({
  type: ADD_ADDRESS,
  payload: address,
});

export const updateAddress = (address) => ({
  type: UPDATE_ADDRESS,
  payload: address,
});

export const deleteAddress = (addressId) => ({
  type: DELETE_ADDRESS,
  payload: addressId,
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

export const toggleItemSelection = (productId) => ({
  type: TOGGLE_ITEM_SELECTION,
  payload: productId,
});

export const loadCartFromStorage = () => ({
  type: LOAD_CART_FROM_STORAGE,
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

export const fetchAddresses = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get("/user/address");
      dispatch(setAddress(response.data));
    } catch (error) {
      console.error("Adresler getirilemedi:", error);
    }
  };
};

export const createAddress = (address) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post("/user/address", address);
      dispatch(addAddress(response.data));
    } catch (error) {
      console.error("Adres eklenemedi:", error);
    }
  };
};

export const editAddress = (address) => {
  return async (dispatch) => {
    try {
      await axiosInstance.put("/user/address", address);
      dispatch(updateAddress(address));
    } catch (error) {
      console.error("Adres güncellenemedi:", error);
    }
  };
};

export const removeAddress = (addressId) => {
  return async (dispatch) => {
    try {
      await axiosInstance.delete(`/user/address/${addressId}`);
      dispatch(deleteAddress(addressId));
    } catch (error) {
      console.error("Adres silinemedi:", error);
    }
  };
};
