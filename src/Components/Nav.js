import React, { useState } from "react";
import "../App.css";
import Header from "./Header";
import Login from "./Login";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (!isNavOpen) {
      document.documentElement.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.documentElement.style.overflow = "auto"; // Enable scrolling
    }
  };

  return (
    <>
      <BrowserRouter>
        <div className="name">
          <h3>PokeFindr</h3>
        </div>
        <div
          className={`hamburger-icon ${isNavOpen ? "open" : ""}`}
          onClick={toggleNav}
        >
          <i className="fa-solid fa-bars"></i>
        </div>

        <div
          className={`x-icon ${isNavOpen ? "open" : ""}`}
          onClick={toggleNav}
        >
          <i class="fa-solid fa-xmark"></i>
        </div>

        <div
          className={`nav-background ${isNavOpen ? "open" : ""}`}
          onClick={toggleNav}
        ></div>
        <div className={`nav-bar ${isNavOpen ? "open" : ""}`}>
          <div className="nav-menu">
            <nav>
              <NavLink to="" activeClassName="active-link">
                Home
              </NavLink>
              <br />
              <NavLink to="login" activeClassName="active-link">
                Login
              </NavLink>
              <br />
              <NavLink to="mycards" activeClassName="active-link">
                My Cards
              </NavLink>
              <br />
              <NavLink to="account" activeClassName="active-link">
                My Account
              </NavLink>
            </nav>
          </div>
        </div>
        <Routes>
          <Route path="" element={<Header setIsNavOpen={setIsNavOpen} />} />
          <Route path="login" element={<Login setIsNavOpen={setIsNavOpen} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
