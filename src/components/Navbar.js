import React, { useEffect, useState } from "react";
import logo from "./Netflix.JPG";
import "./Navbar.css";
import image from "./Avatar.JPG";

const Navbar = () => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img src={logo} alt="Netflix Logo" className="nav_logo" />
      <img src={image} alt="Netflix Profile" className="nav_avatar" />
    </div>
  );
};

export default Navbar;
