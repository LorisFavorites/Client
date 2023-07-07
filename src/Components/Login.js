import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Login({ setIsNavOpen }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("login");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "", confirmPass: "" });

  useEffect(() => {
    setIsNavOpen(false);
    setIsLoading(false);
  }, []);

  const handleButtonClick = (button, event) => {
    event.preventDefault(); // Prevent form submission
    // Clear the formData
    setFormData({ email: "", password: "", name: "", confirmPass: "" });
    // Set which is active
    setActiveButton(button);
  };

  const handleInput = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPass);
  }, [formData.password, formData.confirmPass]);

  useEffect(() => {
    setPasswordEmpty((formData.password === "" || formData.confirmPass === ""));
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // add code here to check if we're logging in or signing up.
    if(activeButton === "signup") {
      console.log("signing up...");
      try {

      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("logging in...");
      try {

      } catch (err) {
        console.log(err);
      }
    }
    setFormData({ email: "", password: "", name: "", confirmPass: "" });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="login">
      <form onSubmit={handleFormSubmit}>
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
          // Sign up form variant
          <>
            <input 
              type="email" 
              placeholder="Email" 
              name="email" 
              value={formData.email} 
              onChange={(event) => handleInput('email', event.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Name" 
              name="name" 
              value={formData.name} 
              onChange={(event) => handleInput('name', event.target.value)} 
            />
            <input
              type="password"
              placeholder="Password"
              className={`pass-input ${!(passwordMatch) ? "error" : ""}`}
              value={formData.password}
              onChange={(event) => handleInput('password', event.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className={`confirm-pass ${
                !passwordMatch ? "error" : ""
              }`}
              value={formData.confirmPass}
              onChange={(event) => handleInput('confirmPass', event.target.value)}
            />
            {(!passwordMatch) && (
              <p
                style={{
                  fontSize: "12px",
                  color: "red",
                }}
              >
                Passwords do not match
              </p>
            )}
            {(passwordMatch && !passwordEmpty) && (
              <p
                style={{
                  fontSize: "12px",
                  color: "green",
                }}
              >
                Passwords match
              </p>
            )}
          </>
        )}
        {activeButton === "login" && (
          // Login form variant
          <>
            <input 
              type="email" 
              placeholder="Email" 
              name="email" value={formData.email} 
              onChange={(event) => handleInput('email', event.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              name="password" 
              value={formData.password} 
              onChange={(event) => handleInput('password', event.target.value)} 
            />
          </>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
