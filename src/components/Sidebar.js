import React from "react";
import { closeMenu } from "../functions/functions";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Shopping Categories</h3>
      <button onClick={closeMenu} className="sidebar-close-btn">
        X
      </button>
      <ul>
        <li>
          <a href="# ">Pants</a>
        </li>
        <li>
          <a href="# ">Shirts</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
