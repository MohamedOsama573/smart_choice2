import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/smart choice logo.svg";
import { CiLogin } from "react-icons/ci";
import compare from "../../assets/compare logo.svg";
import { IoSearchOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import SearchBar from "./SearchBar";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="relative flex justify-between items-center bg-[#302D29] text-white p-3 shadow-md px-5">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold flex items-center gap-1 font-inter text-opacity-50"
      >
        <img src={logo} alt="logo" className="w-10 h-10" />
        Smart Choice
      </Link>

      {/* Search Bar */}
     <div className="hidden md:block">
  <SearchBar />
</div>
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLink
          to="/compare"
          className={({ isActive }) =>
            `flex items-center gap-1 font-bold ${
              isActive ? "text-main" : "text-white hover:text-main"
            }`
          }
        >
          COMPARE
          <img src={compare} alt="compare" className="w-6 h-6" />
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
             `${isActive ? "text-main font-bold" : "text-white hover:text-main"}`
          }
        >
          WISHLIST
        </NavLink>
        {isAuthenticated ? (
          <button
            className="flex items-center gap-1 font-bold"
            onClick={handleLogout}
          >
            <LuLogOut /> Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-1 font-bold ${
                isActive ? "text-main " : "text-white hover:text-main"
              }`
            }
          >
            Log in
            <CiLogin className="text-white text-2xl" />
          </NavLink>
        )}
      </div>

      {/* Hamburger Menu Icon (Mobile) */}
      <div
        className="md:hidden flex flex-col cursor-pointer space-y-1 z-50"
        onClick={toggleMenu}
      >
        <span
          className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </div>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Side Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#302D29] text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col p-5 space-y-6`}
      >
        <button onClick={toggleMenu} className="self-end text-3xl">
          &times;
        </button>
        <NavLink
          to="/compare"
          className={({ isActive }) =>
            `flex items-center gap-2 font-bold ${
              isActive ? "text-main" : "text-white hover:text-main"
            }`
          }
          onClick={toggleMenu}
        >
          <img src={compare} alt="compare" className="w-6 h-6" />
          COMPARE
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex items-center gap-2 font-bold ${
              isActive ? "text-main" : "text-white hover:text-main"
            }`
          }
          onClick={toggleMenu}
        >
          WISHLIST
        </NavLink>
        {isAuthenticated ? (
          <button
            className="flex items-center gap-2 font-bold"
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
          >
            <LuLogOut /> Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-2 font-bold ${
                isActive ? "text-main" : "text-white hover:text-main"
              }`
            }
            onClick={toggleMenu}
          >
            Log in
            <CiLogin className="text-white text-2xl" />
          </NavLink>
        )}
      </div>
    </nav>
  );
};