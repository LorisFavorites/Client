import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Login from "./Login";
import Cards from "./Cards";
import Account from "./Account";
import AuthService from "../utils/auth.js";

import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";

import homeUnown from "../assets/home.png";
import loginUnown from "../assets/login.png";
import cardUnown from "../assets/card.png";
import accountUnown from "../assets/account.png";
import { useQuery } from "@apollo/client";
import { QUERY_ACCOUNT, QUERY_INVENTORY } from "../utils/queries";

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const account = useQuery(QUERY_ACCOUNT);
  const { loading, error, data } = useQuery(QUERY_INVENTORY, {
    variables: { inventory: "pokecards" },
  });

  useEffect(() => {
    if(account.data) {
      const list = account.data.account.favorites.map((card) => card._id);
      setFavoritesList(list);
      // const { account } = data;
      console.log("Account favorites: ", list);
    }
  }, []);

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
            <Link to="/" className="name font-link">
              Poké<span className="title-color-two">Findr</span> |
              ポケッファインダ
            </Link>
          </div>
          <div
            className={`hamburger-icon`}
            onClick={toggleNav}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
          {isLoggedIn ? (
            <div className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="logout-button">
              <Link to="login">Login</Link>
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
            </nav>
          </div>
        </div>
        <Routes>
          <Route
            path=""
            element={
              <Header 
                isNavOpen={isNavOpen} 
                setIsNavOpen={setIsNavOpen}
                favoritesList={favoritesList}
                setFavoritesList={setFavoritesList}
                loading={loading}
                error={error}
                data={data}
              />
            }
          />
          <Route path="login" element={<Login setIsNavOpen={setIsNavOpen} />} />
          <Route
            path="myCards"
            element={<Cards 
              isLoggedIn={isLoggedIn} 
              setIsNavOpen={setIsNavOpen} 
              favoritesList={favoritesList}
              setFavoritesList={setFavoritesList}
              />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
