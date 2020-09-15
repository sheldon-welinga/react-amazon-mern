const {
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAILURE,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DELETE_REQUEST,
} = require("./productTypes");

//list all the products
const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST });

    const config = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch("/api/v1/products/", config);

    const data = await response.json();

    dispatch({ type: PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_FAILURE, payload: err.message });
  }
};

//display a single product details
const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

    const config = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`/api/v1/products/${productId}`, config);

    const data = await response.json();

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_DETAILS_FAILURE, payload: err.message });
  }
};

//save a product
const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();

    const {
      userRegister: { userInfo: register },
    } = getState();

    const token = userInfo.token || register.token;

    if (product.id === undefined) {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(product),
      };
      const response = await fetch("/api/v1/products/", config);

      const data = await response.json();

      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(product),
      };
      const response = await fetch("/api/v1/products/" + product.id, config);

      const data = await response.json();

      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({ type: PRODUCT_SAVE_FAILURE, payload: err.message });
  }
};

//delete a product
const deleteProduct = (productId) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();

  const {
    userRegister: { userInfo: register },
  } = getState();

  const token = userInfo.token || register.token;

  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });

    const config = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token },
    };

    const response = await fetch(`/api/v1/products/${productId}`, config);

    const data = await response.json();

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_DELETE_FAILURE, payload: err.message });
  }
};

export { listProducts, detailsProduct, saveProduct, deleteProduct };
