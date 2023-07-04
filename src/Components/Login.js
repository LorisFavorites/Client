import React, { useEffect } from "react";

export default function Login({ setIsNavOpen }) {
  useEffect(() => {
    setIsNavOpen(false); // Set isNavOpen to false when component mounts
  }, []);
  return (
    <div className="login">
      <form>
        <h1>Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Submit</button>
      </form>
    </div>
  );
}
