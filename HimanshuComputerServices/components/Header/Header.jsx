import React, { useEffect, useState } from "react";
import { Container, Logo, Logout } from "../index.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { assets } from "../../src/assets/Assets.js";
import { useDispatch } from "react-redux";
import { showsearchStatus } from "../../Storage/Product.js";

function Header() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const cart = useSelector((state) => state.product.cart || []);
 
  
  const userData = useSelector((state) => state.auth.userdata);
  const user = userData ? userData.user : null;

  const navigate = useNavigate();



  const navItems = [
    { name: "Home", slug: "/Home", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Contact", slug: "/contact", active: true },
    { name: "About", slug: "/about", active: true },
  ];

  return (
    <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/Home" className="flex items-center">
            <Logo width="70px" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <img
              src={assets.search}
              className="w-10 cursor-pointer"
              alt="Search"
              onClick={() => dispatch(showsearchStatus(true))}
            />

            {/* User Dropdown (Desktop only) */}

            <div className="relative group hidden md:block">
              <img
                src={user?.avatar || assets.user}
                className=" cursor-pointer w-10 h-10 sm:w-15 sm:h-15 rounded-full border-4 border-white shadow-xl object-cover "
                alt="User"
              />
              {authStatus && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg hidden group-hover:flex flex-col">
                  <Link to="/profile" className="px-4 py-2 hover:bg-gray-200">
                    My Profile
                  </Link>
                  <Link to="/orders"  className="px-4 py-2 hover:bg-gray-200">
                    Orders
                  </Link>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img src={assets.Cart} className="w-10" alt="Cart" />
              {cart.length > 0 && (
                <span className="absolute -right-1 -bottom-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Icon */}
            <img
              className="w-7 md:hidden cursor-pointer"
              onClick={() => setVisible(true)}
              src={assets.menu}
              alt="Menu"
            />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 bottom-0 bg-blue-700 text-white transition-all duration-300 z-50 ${
            visible ? "w-3/4 p-6" : "w-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-2 cursor-pointer mb-4"
            >
              <img src={assets.back} className="h-4 rotate-90" alt="Back" />
              <p>Back</p>
            </div>

            {/* Mobile Nav Links */}
            {navItems.map(
              (item) =>
                item.active && (
                  <NavLink
                    key={item.name}
                    onClick={() => setVisible(false)}
                    to={item.slug}
                    className="py-2 px-3 border-b rounded hover:bg-blue-600 transition-colors"
                  >
                    {item.name}
                  </NavLink>
                )
            )}

            {/* Mobile Cart Link */}
            <NavLink
              onClick={() => setVisible(false)}
              to="/cart"
              className="py-2 px-3 border-b rounded hover:bg-blue-600 transition-colors"
            >
              Cart ({cart.length})
            </NavLink>

            {/* Mobile User Links */}
            {authStatus && (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  onClick={() => setVisible(false)}
                  to="/profile"
                  className="py-2 px-3 border-b rounded hover:bg-blue-600 transition-colors"
                >
                  My Profile
                </Link>
                <Link
                  onClick={() => setVisible(false)}
                  to="/orders"
                  className="py-2 px-3 border-b rounded hover:bg-blue-600 transition-colors"
                >
                  Orders
                </Link>
                
              <li>
                <Logout />
              </li>
          
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
export default Header;
