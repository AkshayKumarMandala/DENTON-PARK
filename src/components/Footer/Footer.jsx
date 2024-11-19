import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiReactos } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="py-28 bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container"
      >
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-14 md:gap-4">
          <div
            className="space-y-4 max-w-[300px]"
            style={{ placeSelf: "center" }}
          >
            <h1 className="text-2xl font-bold text-black">DENTON Park</h1>{" "}
            {/* Darkened text */}
            <h1 className="text-2xl text-black">
              Connect with us through
            </h1>{" "}
            {/* Darkened text */}
            <div className="flex space-x-6 py-3">
              <a
                href="https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0"
                className="text-black hover:text-primary"
              >
                <FaWhatsapp className="text-3xl cursor-pointer hover:scale-105 duration-800" />{" "}
                Whatsapp
              </a>
              <a
                href="https://www.instagram.com/the.coding.journey/"
                className="text-black hover:text-primary"
              >
                <FaInstagram className="text-3xl cursor-pointer hover:scale-105 duration-800" />{" "}
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@TheCodingJourney"
                className="text-black hover:text-primary"
              >
                <FaYoutube className="text-3xl cursor-pointer hover:scale-105 duration-800" />{" "}
                Youtube
              </a>
            </div>
            <p className="text-black"></p> {/* Darkened text */}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
