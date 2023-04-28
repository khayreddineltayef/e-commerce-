import {
  CREATE_ORDER,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
} from "./actionTypes";

const initialState = {
  order: null,
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        order: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
