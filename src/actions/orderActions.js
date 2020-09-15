import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
} from "./orderTypes";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });

    const {
      userSignin: { userInfo },
    } = getState();

    const {
      userRegister: { userInfo: register },
    } = getState();

    const token = userInfo.token || register.token;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(order),
    };

    const response = await fetch("/api/v1/orders/", config);

    const data = await response.json();

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.newOrder });
  } catch (err) {
    dispatch({ type: ORDER_CREATE_FAILURE, payload: err.message });
  }
};

export { createOrder };
