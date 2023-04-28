import {
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
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "./actionTypes";

const init = {
  loading: false,
  errors: null,
  users: null,
  token: null,
  isAuth: false,
  status: null,
  updatePasswordMessage: null,
};

const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case REGISTER:
    case LOGIN:
    case GET_PROFILE:
      return { ...state, loading: true };

    case LOGIN_SUCESS:
      return {
        ...state,
        loading: false,
        errors: null,
        token: payload.token,
        users: payload.user,
      };

    case GET_PROFILE_SUCESS:
      return { loading: false, users: payload, isAuth: true };

    case REGISTER_SUCCESS:
      return { ...state, loading: false, users: payload, errors: null };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case GET_PROFILE_FAIL:
      return { ...state, loading: false, errors: payload };

    case LOGOUT_USER:
      return {
        ...state,
        isAuth: false,
        users: null,
      };

    case UPDATE_USER:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        loading: true,
        errors: null,
        updatePasswordMessage: null,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        updatePasswordMessage: payload,
        status: "success",
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
        status: "failure",
      };

    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      localStorage.removeItem("token"); // clear token from local storage

      return {
        ...state,
        loading: false,
        isAuth: false,
        token: null,
        users: null,
      };

    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
export default reducer;
