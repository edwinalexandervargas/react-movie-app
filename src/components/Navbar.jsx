import React, { useState } from "react";
import logo from "../assets/movie-watching.png";
import navLinks from "../constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='relative bg-gradient-to-b from-blue-400 to-blue-300 w-full px-6 md:px-10 py-6 md:py-10 flex justify-between items-center'>
      <img className="h-[70px] w-auto" src={logo} alt="" />
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white text-2xl z-[60]"
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>
      <ul
        className={`${menuOpen ? "flex" : "hidden"} md:flex gap-10 items-center flex-col md:flex-row fixed md:relative inset-0 md:inset-auto bg-blue-400 md:bg-transparent z-50 justify-center md:justify-start`}
      >
        {navLinks.map((link) => (
          <li key={link.label} onClick={() => setMenuOpen(false)}>
            <Link to={link.path} className={link.className}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
