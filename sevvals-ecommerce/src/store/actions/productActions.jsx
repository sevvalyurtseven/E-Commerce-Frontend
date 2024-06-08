import axiosInstance from "../../api/api";

// Action Type Constants:

export const SET_CATEGORIES = "Ürün kategorilerini ayarlamak için kullanılır";
export const SET_PRODUCT_LIST = "Ürün listesini ayarlamak için kullanılır";
export const SET_TOTAL = "Toplam ürün sayısını ayarlamak için kullanılır";
export const SET_FETCH_STATE =
  "Fetch işleminin durumunu ayarlamak için kullanılır";
export const SET_LIMIT =
  "Sayfa başına gösterilecek ürün sayısını ayarlamak için kullanılır";
export const SET_OFFSET = "Sayfa numarasını ayarlamak için kullanılır";
export const SET_FILTER = "Ürün listesini filtrelemek için kullanılır";

// Fetch Constants:

export const GET_PRODUCTS = "Ürünleri getirmek için kullanılır";
export const GET_PRODUCTS_FETCHING =
  "Ürünleri fetch işlemi başlatıldığında kullanılır";
export const GET_PRODUCTS_SUCCESS =
  "Ürünleri fetch işlemi başarıyla tamamlandığında kullanılır";
export const GET_PRODUCTS_ERROR =
  "Ürünleri fetch işlemi başarısız olduğunda kullanılır";
export const GET_CATEGORIES_FETCHING =
  "Kategorileri fetch işlemi başlatıldığında kullanılır";
export const GET_CATEGORIES_SUCCESS =
  "Kategorileri fetch işlemi başarıyla tamamlandığında kullanılır";
export const GET_CATEGORIES_ERROR =
  "Kategorileri fetch işlemi başarısız olduğunda kullanılır";

export const GET_PRODUCT_FETCHING =
  "Ürünü fetch işlemi başlatıldığında kullanılır";
export const GET_PRODUCT_SUCCESS =
  "Ürünü fetch işlemi başarıyla tamamlandığında kullanılır";
export const GET_PRODUCT_ERROR =
  "Ürünü fetch işlemi başarısız olduğunda kullanılır";

// Action Creators:

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const fetchProductsRequest = () => ({
  type: GET_PRODUCTS_FETCHING,
});

export const fetchProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsError = (error) => ({
  type: GET_PRODUCTS_ERROR,
  payload: error,
});

export const fetchCategoriesRequest = () => ({
  type: GET_CATEGORIES_FETCHING,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesError = (error) => ({
  type: GET_CATEGORIES_ERROR,
  payload: error,
});

export const fetchProductRequest = () => ({
  type: GET_PRODUCT_FETCHING,
});

export const fetchProductSuccess = (product) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductError = (error) => ({
  type: GET_PRODUCT_ERROR,
  payload: error,
});

// Async Action Creators:

// Thunk Action Creator:

export const fetchProducts =
  (limit = 50, offset = 0, category = null, filter = null, sort = null) =>
  async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          limit,
          offset,
          category,
          filter,
          sort,
        },
      });
      console.log("fetchProducts response:", response.data); // Hata ayıklama için eklendi
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      console.error("Fetch products failed", error); // Hata mesajını konsola yazdır
      dispatch(fetchProductsError(error));
    }
  };

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesRequest());
    try {
      const response = await axiosInstance.get("/categories");
      dispatch(fetchCategoriesSuccess(response.data));
    } catch (error) {
      console.error("Fetch categories failed", error); // Hata mesajını konsola yazdır
      dispatch(fetchCategoriesError(error.message));
    }
  };
};

export const fetchProductById = (productId) => async (dispatch) => {
  dispatch(fetchProductRequest());
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductError(error));
  }
};
