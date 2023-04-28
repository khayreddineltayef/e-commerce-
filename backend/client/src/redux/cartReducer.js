import {
  ADD_TO_CART,
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  REMOVE_ALL_FROM_CART,
  REMOVE_FROM_CART,
} from "./actionTypes";
const initialState = {
  products: [],
  quantity: 0,
  total: 0,
  loading: false,
  error: null,
  cart: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { price, quantity, ...rest } = action.payload;
      const newProduct = {
        ...rest,
        price: Number(price),
        quantity: Number(quantity),
      };
      return {
        ...state,
        products: [...state.products, newProduct],
        quantity: state.quantity + 1,
        total: state.total + newProduct.price * newProduct.quantity,
      };

    case REMOVE_FROM_CART:
      const { productId, size, color } = action.payload;
      const productIndex = state.products.findIndex(
        (product) =>
          product._id === productId &&
          product.size === size &&
          product.color === color
      );
      if (productIndex !== -1) {
        const productPrice = state.products[productIndex].price;
        const productQuantity = state.products[productIndex].quantity;
        return {
          ...state,
          products: [
            ...state.products.slice(0, productIndex),
            ...state.products.slice(productIndex + 1),
          ],
          quantity: state.quantity - productQuantity,
          total: state.total - productPrice * productQuantity,
        };
      }
      return state;
    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        products: [],
      };
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        products: [],
      };
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default cartReducer;
