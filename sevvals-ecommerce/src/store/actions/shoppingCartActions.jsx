import axiosInstance from "../../api/api";

// Action Type Constants:

export const SET_CART = "Sepet içeriğini ayarlar";
export const SET_PAYMENT_METHODS = "Ödeme yöntemlerini ayarlar";
export const ADD_PAYMENT_METHOD = "Ödeme yöntemini ekleme işlemi";
export const UPDATE_PAYMENT_METHOD = "Ödeme yöntemini güncelleme işlemi";
export const DELETE_PAYMENT_METHOD = "Ödeme yöntemini silme işlemi";
export const SELECT_PAYMENT_METHOD = "Ödeme yöntemini seçme işlemi";
export const SET_ADDRESS = "Adres bilgilerini ayarlar";
export const ADD_ADDRESS = "Adres ekleme işlemi";
export const UPDATE_ADDRESS = "Adres bilgilerini güncelleme işlemi";
export const DELETE_ADDRESS = "Adres bilgilerini silme işlemi";
export const ADD_TO_CART = "Sepete ekleme işlemi";
export const INCREASE_QUANTITY = "Sepetteki ürün miktarını artırma işlemi";
export const DECREASE_QUANTITY = "Sepetteki ürün miktarını azaltma işlemi";
export const REMOVE_FROM_CART = "Sepetten ürün çıkarma işlemi";
export const APPLY_DISCOUNT_CODE = "İndirim kodunu uygulama işlemi";
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

export const setPaymentMethods = (methods) => ({
  type: SET_PAYMENT_METHODS,
  payload: methods,
});

export const addPaymentMethod = (method) => ({
  type: ADD_PAYMENT_METHOD,
  payload: method,
});

export const updatePaymentMethod = (method) => ({
  type: UPDATE_PAYMENT_METHOD,
  payload: method,
});

export const deletePaymentMethod = (methodId) => ({
  type: DELETE_PAYMENT_METHOD,
  payload: methodId,
});

export const selectPaymentMethod = (id) => ({
  type: SELECT_PAYMENT_METHOD,
  payload: id,
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

export const applyDiscountCode = (code, discountAmount) => ({
  type: APPLY_DISCOUNT_CODE,
  payload: { code, discountAmount },
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

export const fetchAddresses = (token) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get("/user/address", {
        headers: { Authorization: `${token}` },
      });
      dispatch(setAddress(response.data));
    } catch (error) {
      console.error("Adresler getirilemedi:", error);
    }
  };
};

export const createAddress = (address, token) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post("/user/address", address, {
        headers: { Authorization: `${token}` },
      });
      dispatch(addAddress(response.data));
    } catch (error) {
      console.error("Adres eklenemedi:", error);
    }
  };
};

export const editAddress = (address, token) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put("/user/address", address, {
        headers: { Authorization: `${token}` },
      });
      dispatch(updateAddress(response.data));
    } catch (error) {
      console.error("Adres güncellenemedi:", error);
    }
  };
};

export const removeAddress = (addressId, token) => {
  return async (dispatch) => {
    try {
      await axiosInstance.delete(`/user/address/${addressId}`, {
        headers: { Authorization: `${token}` },
      });
      dispatch(deleteAddress(addressId));
    } catch (error) {
      console.error("Adres silinemedi:", error);
    }
  };
};

export const fetchPaymentMethods = (token) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get("/user/card", {
        headers: { Authorization: `${token}` },
      });
      dispatch(setPaymentMethods(response.data));
    } catch (error) {
      console.error("Ödeme yöntemleri getirilemedi:", error);
    }
  };
};

export const createPaymentMethod = (method, token) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post("/user/card", method, {
        headers: { Authorization: `${token}` },
      });
      dispatch(addPaymentMethod(response.data));
      // Ödeme yöntemlerini yeniden yükle
      dispatch(fetchPaymentMethods(token));
    } catch (error) {
      console.error("Ödeme yöntemi eklenemedi:", error);
    }
  };
};

export const editPaymentMethod = (method, token) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put("/user/card", method, {
        headers: { Authorization: `${token}` },
      });
      dispatch(updatePaymentMethod(response.data));
      // Ödeme yöntemlerini yeniden yükle
      dispatch(fetchPaymentMethods(token));
    } catch (error) {
      console.error("Ödeme yöntemi güncellenemedi:", error);
    }
  };
};

export const removePaymentMethod = (methodId, token) => {
  return async (dispatch) => {
    try {
      await axiosInstance.delete(`/user/card/${methodId}`, {
        headers: { Authorization: `${token}` },
      });
      dispatch(deletePaymentMethod(methodId));
    } catch (error) {
      console.error("Ödeme yöntemi silinemedi:", error);
    }
  };
};
