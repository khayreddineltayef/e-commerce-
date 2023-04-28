import axios from "axios";
import {
  ADD_TO_CART,
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CREATE_ORDER,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCESS,
  LOGOUT_USER,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REMOVE_ALL_FROM_CART,
  REMOVE_FROM_CART,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "./actionTypes";

export const registerUser = (newUser) => async (dispatch) => {
  dispatch({
    type: REGISTER,
  });
  try {
    const { data } = await axios.post("/user/register", newUser);

    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data });
  }
};
export const login = (user) => async (dispatch) => {
  dispatch({
    type: LOGIN,
  });
  try {
    const { data } = await axios.post("/user/login", user);
    localStorage.setItem("token", data.token);

    dispatch({ type: LOGIN_SUCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};
export const getProfile = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_PROFILE,
  });
  try {
    const { data } = await axios.get("/user/auth", config);
    dispatch({
      type: GET_PROFILE_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAIL, payload: error.response.data });
  }
};
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

/////////////////////////////////////////////////////////
export function addToCart2(item) {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
}
//////
export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};
export const removeAllFromCart = () => ({
  type: REMOVE_ALL_FROM_CART,
});
////////////////////////////////////////////
// action creators
export const updateUser = (id, userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER });

  try {
    const response = await axios.put(`/user/update/${id}`, userData);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: err.response.data.message || "Something went wrong",
    });
  }
};
////////////////////
const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST,
});

const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
});

const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

// export const deleteUser = (userId) => {
//   return async (dispatch) => {
//     dispatch(deleteUserRequest());
//     try {
//       await axios.delete(`/user/${userId}`);
//       dispatch(deleteUserSuccess());
//       // optionally, dispatch an action to clear user-related state
//     } catch (error) {
//       dispatch(deleteUserFailure(error));
//     }
//   };
// };
export const deleteUser = (userId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token"); // replace 'authToken' with the key for your token in local storage
    const options = {
      headers: {
        Authorization: token,
      },
    };
    dispatch(deleteUserRequest());
    try {
      await axios.delete(`/user/${userId}`, options);
      dispatch(deleteUserSuccess());
      // optionally, dispatch an action to clear user-related state
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
};
//////
export const updatePassword = (userId, oldPassword, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD });

    try {
      const res = await axios.put(`/user/update-password/${userId}`, {
        oldPassword,
        newPassword,
      });

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: res.data.message,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
};
/////////////
export const addToCart = (userId, products) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });
    const { data } = await axios.post("/cart/add", {
      userId,
      products,
    });
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message });
  }
};
/////

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER });
    const res = await axios.post("/order/", orderData);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: err.response.data.message });
  }
};
/////
