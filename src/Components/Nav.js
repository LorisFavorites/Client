import React, { useState } from "react";
import "../App.css";
import Header from "./Header";
import Login from "./Login";
import Cards from "./Cards";
import AuthService from "../utils/auth.js";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import homeUnown from "../assets/home.png";
import loginUnown from "../assets/login.png";
import cardUnown from "../assets/card.png";
import accountUnown from "../assets/account.png";

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

const handleLogout = () => {
  AuthService.logout();
};

const isLoggedIn = AuthService.loggedIn();

  return (
    <>
      <BrowserRouter>
        <div className="nav-header">
          <div>
            <h3 className="name font-link">Poké<span className="title-color-two">Findr</span> | ポケッファインダ</h3>
          </div>
          <div
            className={`hamburger-icon ${isNavOpen ? "open" : ""}`}
            onClick={toggleNav}
          >
          <i className="fa-solid fa-bars"></i>
          </div>
          {isLoggedIn && (
            <div className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </div>
            )}
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
          <div className="nav-menu font-link">
            {/* <h2 className="title-menu">PokéFindr</h2> */}
            <nav>
              <NavLink to="" activeClassName="active-link">
                <div className="link">
                <img className="unown-fat" src={homeUnown} alt="Home" />
                  <p>Home</p>
                </div>
              </NavLink>
              <br />
              <NavLink to="login" activeClassName="active-link">
                <div className="link">
                  <img className="unown-tall" src={loginUnown} alt="Login" />
                  <p>Login</p>
                </div>
              </NavLink>
              <br />
              <NavLink to="mycards" activeClassName="active-link">
                <div className="link">
                  <img className="unown-fat" src={cardUnown} alt="My Cards" />
                  <p>My Cards</p>
                </div>
              </NavLink>
              <br />
              <NavLink to="account" activeClassName="active-link">
                <div className="link">
                  <img className="unown-account" src={accountUnown} alt="My Account" />
                  <p>My Account</p>
                </div>
              </NavLink>
            </nav>
          </div>
        </div>
        <Routes>
          <Route path="" element={<Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />} />
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
