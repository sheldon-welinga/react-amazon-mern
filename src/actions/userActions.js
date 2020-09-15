const Cookie = require("js-cookie");
const {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} = require("./userTypes");

const signinUser = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch("/api/v1/users/Signin", config);

    const data = await response.json();

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    Cookie.set("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: USER_SIGNIN_FAILURE, payload: err.message });
  }
};

const registerUser = (firstname, lastname, email, password) => async (
  dispatch
) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { firstname, lastname, email, password },
  });
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    };
    const response = await fetch("/api/v1/users/register", config);

    const data = await response.json();

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    Cookie.set("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAILURE, payload: err.message });
  }
};

export { signinUser, registerUser };
