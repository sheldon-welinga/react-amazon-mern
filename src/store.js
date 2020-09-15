import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import Cookie from "js-cookie";
import thunk from "redux-thunk";
import { userSigninReducer, userRegisterReducer } from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import productDetailsReducer from "./reducers/productDetailsReducer";
import productSaveReducer from "./reducers/productSaveReducer";
import productDeleteReducer from "./reducers/productDeleteReducer";
import cartReducer from "./reducers/cartReducer";

import orderCreateReducer from "./reducers/orderCreateReducer";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
  userRegister: { userInfo },
};

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  createOrder: orderCreateReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
