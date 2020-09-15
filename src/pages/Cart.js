import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let { cartItems } = cart;

  //   console.log(cartItems);
  const productId = props.match.params.cart_id;
  const searchValue = props.location.search;
  const quantity = searchValue ? Number(searchValue.split("=")[1]) : 1;

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  //   let cartQuantity = 0;

  //   let cartTotalPrice = 0;
  //   if (cartItems.length === 0) {
  //     return <div className="page-height">Loading...</div>;
  //   } else {
  //     for (let i = 0; i < cartItems.length; i++) {
  //       let total = cartItems[i].price * cartItems[i].quantity;
  //       cartTotalPrice += total;
  //     }
  //   }

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //   console.log(props.location);
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="page-height cart">
      <div className="cart-list">
        <div className="cart-list-container">
          <div className="cart-header">
            <h3>Shopping Cart</h3>
            <p>
              <strong>Price</strong>
            </p>
          </div>
          {cartItems.length === 0 ? (
            <div>Cart is Empty</div>
          ) : (
            cartItems.map((item, index) => {
              return (
                <div key={index} className="cart-item">
                  <div className="cart-image">
                    <img src={item.image} alt={`${item.name} product`} />
                  </div>
                  <p className="cart-name">
                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                  </p>
                  <p className="cart-quantity">
                    Quantity:{" "}
                    <select
                      value={item.quantity}
                      onChange={(e) => {
                        item.quantity = Number(e.target.value);

                        props.history.push(
                          `/cart/${item.productId}?quantity=${e.target.value}`
                        );

                        dispatch(
                          addToCart(item.productId, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.productId)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </p>
                  <p className="cart-price">Ksh. {item.price}</p>
                </div>
              );
            })
          )}
        </div>
        <div className="back-link">
          <Link to="/">
            {" "}
            <i className="fa fa-long-arrow-left"></i> Back to products
          </Link>
        </div>
      </div>
      <div className="cart-action">
        <h3>
          <span>Subtotal ({cartQuantity})</span>:
          <span> Ksh. {cartTotalPrice}</span>
        </h3>
        <button
          className="btn btn-primary"
          disabled={cartItems.length === 0}
          onClick={checkOutHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
