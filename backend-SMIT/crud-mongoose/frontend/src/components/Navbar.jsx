import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        
        {/* Left - Logo */}
        <div className="text-xl font-bold text-gray-800">
          MyLogo
        </div>

        {/* Right - Text items (NOT links) */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link to={"/"} className="cursor-default hover:text-black">
            Create Post
          </Link >

          <Link to={"/users"}  className="cursor-default hover:text-black">
            All Users
          </Link >
        </div>

      </div>
    </nav>
  );
};

export default Navbar;