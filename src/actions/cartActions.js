import Cookie from "js-cookie";
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  ADD_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_FAILURE,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "./cartTypes";

const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`/api/v1/products/${productId}`, config);

    const data = await response.json();

    const payload = {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    };

    dispatch({ type: ADD_CART_ITEM, payload });

    const {
      cart: { cartItems },
    } = getState();

    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (err) {
    dispatch({ type: ADD_CART_ITEM_FAILURE, payload: err.message });
  }
};

const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM, payload: productId });

    const {
      cart: { cartItems },
    } = getState();

    Cookie.remove("cartItems");

    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (err) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: err.message });
  }
};

const saveShipping = (shippingData) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: shippingData });
};

const savePayment = (paymentData) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: paymentData });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
