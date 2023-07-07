import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Login({ setIsNavOpen }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("login");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    setIsNavOpen(false);
    setIsLoading(false);
  }, []);

  const handleButtonClick = (button, event) => {
    event.preventDefault(); // Prevent form submission
    setActiveButton(button);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

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
        <h1>{activeButton === "signup" ? "Sign Up" : "Login"}</h1>
        {activeButton === "signup" && (
          <>
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Name" />
            <div className="inputs">
              <input
                type="password"
                placeholder="Password"
                className={`pass-input ${
                  !passwordMatch && password && confirmPassword ? "error" : ""
                }`}
                value={password}
                onChange={handlePasswordChange}
              />
              {!passwordMatch && password && confirmPassword && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "red",
                  }}
                >
                  Passwords do not match
                </p>
              )}
            </div>
            <div className="inputs">
              <input
                type="password"
                placeholder="Confirm Password"
                className={`confirm-pass ${
                  !passwordMatch && password && confirmPassword ? "error" : ""
                }`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!passwordMatch && password && confirmPassword && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "red",
                  }}
                >
                  Passwords do not match
                </p>
              )}
              {passwordMatch && password && confirmPassword && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "green",
                  }}
                >
                  Passwords match
                </p>
              )}
            </div>
          </>
        )}
        {activeButton === "login" && (
          <>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
          </>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
