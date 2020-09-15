import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import CreateProduct from "./pages/CreateProduct";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:product_id" component={Product} />
        <Route exact path="/cart/:cart_id?" component={Cart} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/create-product" component={CreateProduct} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/place-order" component={PlaceOrder} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
