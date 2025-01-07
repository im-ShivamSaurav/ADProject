import React from 'react';
import { useNavigate } from "react-router-dom";

import '../styles/Navbar.css';

import logo from '../assets/logo.jpeg';

const Navbar = () => {

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignInClick = () => {
    navigate("/signIn");
    }
  return (
    <nav className="navbar">
      <div className="logo">
        <img className="logoimg" alt="zerodha" src={logo} width={30} height={30} />
            <span className="logotext">Zerodha</span>
      </div>

      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#support">Support</a></li>
        <li><button onClick={handleSignInClick} className="signup-btn">Sign-In</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
