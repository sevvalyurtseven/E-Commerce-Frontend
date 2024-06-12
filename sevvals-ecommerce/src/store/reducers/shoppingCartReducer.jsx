import {
  ADD_ADDRESS,
  ADD_TO_CART,
  APPLY_DISCOUNT_CODE,
  DECREASE_QUANTITY,
  DELETE_ADDRESS,
  GET_CART_ERROR,
  GET_CART_FETCHING,
  GET_CART_SUCCESS,
  INCREASE_QUANTITY,
  LOAD_CART_FROM_STORAGE,
  REMOVE_FROM_CART,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT_METHODS,
  ADD_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD,
  TOGGLE_ITEM_SELECTION,
  UPDATE_ADDRESS,
  SELECT_PAYMENT_METHOD,
  RESET_CART,
} from "../actions/shoppingCartActions";

const initialState = {
  cart: [],
  discountCode: "",
  discountAmount: 0,
  totalPrice: 0, // Toplam fiyatı başlangıç durumuna ekleyin
  totalCount: 0, // Toplam miktarı başlangıç durumuna ekleyin
  payment: {},
  addresses: [],
  selectedAddress: null,
  paymentMethods: [], // Ödeme yöntemlerini başlangıç durumuna ekleyin
  selectedPaymentMethod: null, // Seçilen ödeme yöntemini ekleyin
  isFetching: false, // fetching durumunu belirten alan
  error: null, // hata mesajını tutan alan
};

// Toplam fiyatı hesaplayan yardımcı fonksiyon
const calculateTotalPrice = (cart, discountAmount = 0) => {
  return (
    cart.reduce((total, item) => total + item.product.price * item.count, 0) -
    discountAmount
  );
};

// Toplam miktarı hesaplayan yardımcı fonksiyon
const calculateTotalCount = (cart) => {
  return cart.reduce((total, item) => total + item.count, 0);
};

// Sepeti LocalStorage'a kaydetme fonksiyonu
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
};

// LocalStorage'dan sepeti yükleme fonksiyonu
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("shoppingCart");
  return cart ? JSON.parse(cart) : [];
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
        totalPrice: calculateTotalPrice(action.payload, state.discountAmount),
        totalCount: calculateTotalCount(action.payload),
      };
    case ADD_TO_CART: {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );
      let newCart;
      if (existingProductIndex >= 0) {
        newCart = state.cart.slice();
        newCart[existingProductIndex].count += 1;
      } else {
        newCart = [
          ...state.cart,
          { count: 1, checked: true, product: action.payload },
        ];
      }
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
        totalPrice: calculateTotalPrice(newCart, state.discountAmount),
        totalCount: calculateTotalCount(newCart),
      };
    }
    case INCREASE_QUANTITY: {
      const newCart = state.cart.map((item) =>
        item.product.id === action.payload
          ? { ...item, count: item.count + 1 }
          : item
      );
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
        totalPrice: calculateTotalPrice(newCart, state.discountAmount),
        totalCount: calculateTotalCount(newCart),
      };
    }
    case DECREASE_QUANTITY: {
      const newCart = state.cart.map((item) =>
        item.product.id === action.payload && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      );
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
        totalPrice: calculateTotalPrice(newCart, state.discountAmount),
        totalCount: calculateTotalCount(newCart),
      };
    }
    case REMOVE_FROM_CART: {
      const newCart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
        totalPrice: calculateTotalPrice(newCart, state.discountAmount),
        totalCount: calculateTotalCount(newCart),
      };
    }
    case TOGGLE_ITEM_SELECTION: {
      const newCart = state.cart.map((item) =>
        item.product.id === action.payload
          ? { ...item, checked: !item.checked }
          : item
      );
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
        totalPrice: calculateTotalPrice(newCart, state.discountAmount),
        totalCount: calculateTotalCount(newCart),
      };
    }
    case LOAD_CART_FROM_STORAGE: {
      const loadedCart = loadCartFromLocalStorage();
      return {
        ...state,
        cart: loadedCart,
        totalPrice: calculateTotalPrice(loadedCart, state.discountAmount),
        totalCount: calculateTotalCount(loadedCart),
      };
    }
    case APPLY_DISCOUNT_CODE: {
      const { code, discountAmount } = action.payload;
      return {
        ...state,
        discountCode: code,
        discountAmount: discountAmount,
        totalPrice: calculateTotalPrice(state.cart, discountAmount),
      };
    }
    case GET_CART_FETCHING:
      return { ...state, isFetching: true, error: null };
    case GET_CART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cart: action.payload,
        totalPrice: calculateTotalPrice(action.payload, state.discountAmount),
        totalCount: calculateTotalCount(action.payload),
      };
    case GET_CART_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    case SET_ADDRESS:
      return {
        ...state,
        addresses: action.payload,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map((address) =>
          address.id === action.payload.id ? action.payload : address
        ),
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.payload
        ),
      };
    case SET_PAYMENT_METHODS:
      return {
        ...state,
        paymentMethods: action.payload,
      };
    case ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethods: [...state.paymentMethods, action.payload],
      };
    case UPDATE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethods: state.paymentMethods.map((method) =>
          method.id === action.payload.id ? action.payload : method
        ),
      };
    case DELETE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethods: state.paymentMethods.filter(
          (method) => method.id !== action.payload
        ),
      };
    case SELECT_PAYMENT_METHOD:
      return {
        ...state,
        selectedPaymentMethod: action.payload,
      };
    case RESET_CART:
      return {
        ...state,
        cart: [],
        totalPrice: 0,
        totalCount: 0,
        discountCode: "",
        discountAmount: 0,
      };

    default:
      return state;
  }
};
