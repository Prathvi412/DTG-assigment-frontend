import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 shadow-md">
      {/* Logo */}
      <div className="text-white font-bold text-2xl tracking-wide">
        DGT <span className="text-blue-400">Organization</span>
      </div>

      {/* Navigation Links */}
      {token && (
        <div className="flex space-x-6">
          <NavLink
            to="/leader"
            className={({ isActive }) =>
              `px-4 py-2 text-white text-lg font-medium transition-all duration-300 rounded 
              ${isActive ? "bg-blue-500 shadow-md" : "hover:text-blue-300"}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `px-4 py-2 text-white text-lg font-medium transition-all duration-300 rounded 
              ${isActive ? "bg-blue-500 shadow-md" : "hover:text-blue-300"}`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/team"
            className={({ isActive }) =>
              `px-4 py-2 text-white text-lg font-medium transition-all duration-300 rounded 
              ${isActive ? "bg-blue-500 shadow-md" : "hover:text-blue-300"}`
            }
          >
            Team
          </NavLink>
        </div>
      )}

      {/* Auth Buttons */}
      <div className="flex space-x-4">
        {!token ? (
          <>
            <NavLink
              to="/login"
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
