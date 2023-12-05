// Navbar.js

import React, { useState, useEffect } from "react";
import checkUserLoggedIn from "../util/IsLogin";
import axios from "axios";
const bootstrap = require("bootstrap");

const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  const handleLogout = async (e) => {
    e.preventDefault();
    // Remove the token from local storage
    localStorage.removeItem("token");
    // const response = await axios.get("https://hocus-pocus-backend.onrender.com/auth/signout")
    setIsUserLoggedIn();
    window.location = "/";
    
  };

  useEffect(() => {
    setIsUserLoggedIn(checkUserLoggedIn());
  }, []);

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32"></svg>
          <span className="fs-4">Hocus Focus</span>
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="/" className="nav-link" aria-current="page">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/ads" className="nav-link">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
          {isUserLoggedIn ? (
            <div className="d-flex">


            <li className="nav-item">
                <a href="/profile" className="nav-link">
                  Profile
                </a>
              </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>

            </div>
          ) : (
            <div className="d-flex">
              <li className="nav-item">
                <a href="/sign-in" className="nav-link">
                  Sign-in
                </a>
              </li>
              <li className="nav-item">
                <a href="/register" className="nav-link">
                  Register
                </a>
              </li>
            </div>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
