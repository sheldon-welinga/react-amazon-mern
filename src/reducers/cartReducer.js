import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  REMOVE_CART_ITEM_FAILURE,
  ADD_CART_ITEM_FAILURE,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../actions/cartTypes";

const initialState = {
  cartItems: [],
  error: "",
  shipping: {},
  payment: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const itemPayload = action.payload;
      const product = state.cartItems.find(
        (item) => item.productId === itemPayload.productId
      );

      if (product) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.productId === itemPayload.productId ? itemPayload : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, itemPayload],
      };

    case ADD_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case CART_SAVE_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };
    case CART_SAVE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case REMOVE_CART_ITEM:
      const foundIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload
      );
      state.cartItems.splice(foundIndex, 1);
      return {
        cartItems: [...state.cartItems],
      };

    case REMOVE_CART_ITEM_FAILURE:
      return {
        ...state,

        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
