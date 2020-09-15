import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

const PlaceOrder = (props) => {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useDispatch((state) => state.orderCreate);
  const dispatch = useDispatch();
  const { success, order } = orderCreate;

  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success]);

  let { cartItems, shipping, payment } = cart;

  if (!shipping.address) {
    return <Redirect to="/shipping" />;
  }

  if (!payment.paymentMethod) {
    return <Redirect to="/payment" />;
  }

  const placeOrderHandler = () => {
    //create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  const itemsPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 5000 ? 0 : 320;
  const taxPrice = Number((0.16 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const { address, city, postalCode, country } = cart.shipping;

  // console.log(props);
  return (
    <div className="page-height">
      <div className="checkout-container">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>

      <div className="place-order">
        <div className="place-order-info">
          <div className="place-order-header">
            <h3>Shipping</h3>
            <div>
              {address} - {postalCode}, {city}, {country}{" "}
            </div>
          </div>
          <div className="place-order-payment">
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>

          <div className="place-order-cart-list">
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
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </p>
                      <p className="cart-quantity">Quantity: {item.quantity}</p>
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
        </div>

        <div className="place-order-action">
          <div className="order-item-container">
            <div className="order-item">
              <button className="btn btn-primary" onClick={placeOrderHandler}>
                Place Order
              </button>
            </div>
            <div className="order-item">
              <h3>Order Summary</h3>
            </div>
            <div className="order-item">
              <h4>Items Price</h4>
              <p>Kshs. {itemsPrice}</p>
            </div>
            <div className="order-item">
              <h4>Shipping</h4>
              <p>Kshs. {shippingPrice}</p>
            </div>
            <div className="order-item">
              <h4>Tax</h4>
              <p>Kshs. {taxPrice}</p>
            </div>
            <div className="order-item">
              <h2>Order Total</h2>
              <p>Kshs. {totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//   console.log(shipping);

//   console.log(props.location);

export default PlaceOrder;
