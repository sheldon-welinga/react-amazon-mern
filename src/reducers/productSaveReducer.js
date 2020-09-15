import {
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAILURE,
} from "../actions/productTypes";

const initialState = {
  loading: false,
  success: false,
  product: {},
  error: "",
};

const productSaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_SAVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productSaveReducer;
