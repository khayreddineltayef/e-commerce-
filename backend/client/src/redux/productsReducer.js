import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  TOGGLE_LIKE_PRODUCT,
  LOGOUT_USER,
} from "./actionTypes";

const init = {
  products: [],
  loading: false,
  errors: [],
  likedProducts: JSON.parse(localStorage.getItem("likedProducts")) || [],
};

const productReducer = (state = init, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        errors: [...state.errors, payload],
      };
    //////
    case TOGGLE_LIKE_PRODUCT:
      const likedProducts = state.likedProducts.includes(payload)
        ? state.likedProducts.filter((id) => id !== payload)
        : [...state.likedProducts, payload];
      localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
      return {
        ...state,
        likedProducts,
      };
    //////
    case LOGOUT_USER:
      return {
        ...state,
        likedProducts: [],
        // products: [],
      };
    //////
    default:
      return state;
  }
};

export default productReducer;
