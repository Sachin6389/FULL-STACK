import React from "react";
import { Assest } from "../assets/Assest";

function Navbar({ settoken }) {
  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src={Assest.logo}
            alt="Logo"
            className="h-10 sm:h-12 md:h-14 w-auto cursor-pointer hover:scale-105 transition-transform duration-200"
          />

          <h1 className="
            text-sm 
            sm:text-lg 
            md:text-2xl 
            lg:text-3xl 
            font-bold 
            text-gray-800 
            whitespace-nowrap
          ">
            Himanshu Computer Services
          </h1>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => settoken("")}
          className="
            bg-red-500 
            text-white 
            px-3 
            sm:px-4 
            py-2 
            rounded-lg 
            text-xs 
            sm:text-sm
            hover:bg-red-600 
            active:scale-95 
            transition
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
