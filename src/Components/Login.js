import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { ADD_PROFILE, LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import Loading from "./Loading";

export default function Login({ setIsNavOpen }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("login");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "", confirmPass: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER); // Set up login mutation into React Hook
  const [signup, { err, dat }] = useMutation(ADD_PROFILE);

  useEffect(() => {
    setIsNavOpen(false);
    setIsLoading(false);
  }, []);

  const handleButtonClick = (button, event) => {
    event.preventDefault(); // Prevent form submission
    // Clear the formData when switching between tabs
    setFormData({ email: "", password: "", name: "", confirmPass: "" });
    // Set which is active
    setActiveButton(button);
  };

  const handleInput = (name, value) => {
    // Update form data to match user inputs
    setFormData({...formData, [name]: value});
  };

  // watch for changes to password and match
  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPass);
  }, [formData.password, formData.confirmPass]);

  // Keep "passwords match" from flashing when passwords are empty
  useEffect(() => {
    setPasswordEmpty((formData.password === "" || formData.confirmPass === ""));
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // add code here to check if we're logging in or signing up.
    if(activeButton === "signup") {
      console.log("signing up...");
      try {
        // Call the mutation hook, send form data to server, get back token if succesful
        const { data } = await signup({ variables: { ...formData } });

        // If signup was succesful store token using the auth login
        Auth.login(data.signup.token);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("logging in...");
      try {
        // Call the mutation hook, send form data to server, get back token if succesful
        const { data } = await login({ variables: { email: formData.email, password: formData.password } });

        // Use auth util to store token into localstorage if successful
        Auth.login(data.login.token);
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
              autoComplete="false"
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
              autoComplete="false"
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
