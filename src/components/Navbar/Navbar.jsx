import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "About Us", path: "/AboutUs" },
  { id: 3, title: "Calendar", path: "/calendar" },
  { id: 4, title: "Contact Us", path: "/contactus" },
  { id: 5, title: "Reviews", path: "/reviews" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative z-20 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-10 flex justify-between items-center"
      >
        <div>
          <h1 className="font-bold text-2xl text-black">DENTON Park</h1>
        </div>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.path}
                  className="inline-block py-2 px-3 text-black relative group"
                >
                  <div className="w-2 h-2 bg-black absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                  {menu.title}
                </a>
              </li>
            ))}
            <button
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-black"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Sign In
            </button>
          </ul>
        </div>
        <div className="lg:hidden">
          <IoMdMenu
            className="text-4xl cursor-pointer text-white"
            onClick={toggleMenu}
          />
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-black text-white shadow-lg z-10">
          <ul className="flex flex-col items-center gap-3 p-5">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.path}
                  className="block py-2 px-3 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {menu.title}
                </a>
              </li>
            ))}
            <button
              className="bg-black text-black py-2 px-4 rounded-md mt-2 hover:bg-yellow-800"
              onClick={() => {
                window.location.href = "/login";
                setIsMenuOpen(false);
              }}
            >
              Sign In
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
