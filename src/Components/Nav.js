import React, { useState } from "react";
import "../App.css";
import Header from "./Header";
import Login from "./Login";
import Cards from "./Cards";

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

        {/* nav-bar will have a class of open adding to it if isNavOpen is true */}
        <div className={`nav-bar ${isNavOpen ? "open" : ""}`}>
          <div className="nav-menu">
            <h2 className="title-menu">PokeFindr</h2>
            <nav>
              <NavLink to="" activeClassName="active-link">
                <div className="link">
                  <i class="fa-solid fa-house"></i>
                  <p>Home</p>
                </div>
              </NavLink>
              <br />
              <NavLink to="login" activeClassName="active-link">
                <div className="link">
                  <i class="fa-solid fa-user"></i> <p>Login</p>
                </div>
              </NavLink>
              <br />
              <NavLink to="mycards" activeClassName="active-link">
                <div className="link">
                  <i class="fa-solid fa-bookmark"></i> <p>My Cards</p>
                </div>
              </NavLink>
              <br />
              <NavLink to="account" activeClassName="active-link">
                <div className="link">
                  <i class="fa-solid fa-gear"></i> <p>My Account</p>
                </div>
              </NavLink>
            </nav>
          </div>
        </div>
        <Routes>
          <Route path="" element={<Header setIsNavOpen={setIsNavOpen} />} />
          <Route path="login" element={<Login setIsNavOpen={setIsNavOpen} />} />
          <Route
            path="myCards"
            element={<Cards setIsNavOpen={setIsNavOpen} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
