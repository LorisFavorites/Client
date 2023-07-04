import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Login({ setIsNavOpen }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("login");

  useEffect(() => {
    setIsNavOpen(false);
    setIsLoading(false);
  }, []);

  const handleButtonClick = (button, event) => {
    event.preventDefault(); // Prevent form submission

    setActiveButton(button);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="login">
      <form>
        <div className="login-signup">
          <button
            className={`button-login ${
              activeButton === "login" ? "active" : ""
            }`}
            onClick={(event) => handleButtonClick("login", event)}
          >
            Login
          </button>
          <button
            className={`button-signup ${
              activeButton === "signup" ? "active" : ""
            }`}
            onClick={(event) => handleButtonClick("signup", event)}
          >
            Sign Up
          </button>
        </div>
        <h1>Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
