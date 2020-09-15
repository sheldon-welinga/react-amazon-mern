import React from "react";
import { openMenu } from "../functions/functions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userSignin;
  const { userInfo: registered } = userRegister;

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <Link to="/">amazon</Link>
        </div>
        <div className="header-nav">
          <Link to="/cart" className="cart">
            Cart
          </Link>
          {userInfo ? (
            <Link to="/profile" className="profile">
              {userInfo.firstname}
            </Link>
          ) : registered ? (
            <Link to="/profile" className="profile">
              {registered.firstname}
            </Link>
          ) : (
            <Link to="/signin" className="signin">
              Sign in
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
