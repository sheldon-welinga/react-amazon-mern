import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
} from "../actions/orderTypes";

const initialState = {
  loading: false,
  success: false,
  error: "",
  order: {},
};

const orderCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
      };
    case ORDER_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderCreateReducer;
