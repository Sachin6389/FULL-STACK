import React from "react";
import { NavLink } from "react-router-dom";
import { Assest } from "../assets/Assest.js";

function Sidebar() {
  return (
    <aside className="
      w-full 
      md:w-64 
      bg-white 
      border-r 
      shadow-sm
    ">
      <nav className="
        flex 
        md:flex-col 
        flex-row 
        md:gap-3 
        gap-2 
        p-3 
        md:pt-6 
        text-sm
        justify-around
        md:justify-start
      ">

        {/* Add Item */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
             ${
               isActive
                 ? "bg-green-600 text-white"
                 : "hover:bg-green-100 text-gray-700"
             }`
          }
        >
          <img
            src={Assest.add}
            alt="Add"
            className="h-5 w-5"
          />
          <span className="hidden md:block">Add Item</span>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
             ${
               isActive
                 ? "bg-green-600 text-white"
                 : "hover:bg-green-100 text-gray-700"
             }`
          }
        >
          <img
            src={Assest.list}
            alt="List"
            className="h-5 w-5"
          />
          <span className="hidden md:block">List Items</span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
             ${
               isActive
                 ? "bg-green-600 text-white"
                 : "hover:bg-green-100 text-gray-700"
             }`
          }
        >
          <img
            src={Assest.order}
            alt="Order"
            className="h-5 w-5"
          />
          <span className="hidden md:block">Orders</span>
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;
