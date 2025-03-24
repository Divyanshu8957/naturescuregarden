import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/Logo.jpg";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white py-4 shadow-md"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8">
        {/* Logo Section */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 mb-4 md:mb-0"
        >
          <motion.img
            src={logo}
            alt="Logo"
            className="w-12 h-12 object-contain"
            whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
          />
          <div className="flex items-baseline">
            <span className="text-2xl font-bold italic text-green-700">N</span>
            <span className="text-xl font-semibold text-gray-800">ature's</span>
            <span className="ml-1 text-2xl font-bold italic text-green-700">C</span>
            <span className="text-xl font-semibold text-gray-800">ure</span>
          </div>
        </motion.a>

        {/* Search & Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search Bar (hidden on mobile) */}
          <div className="flex-1 hidden md:block">
            <SearchBar />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="hover:text-green-600"
            >
              Home
            </motion.a>
            <motion.a
              href="/categories"
              whileHover={{ scale: 1.05 }}
              className="hover:text-green-600"
            >
              Categories
            </motion.a>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              className="hover:text-green-600"
            >
              About Us
            </motion.a>
            <motion.button
              onClick={() => navigate("/herba")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow-lg"
            >
              Herba
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
