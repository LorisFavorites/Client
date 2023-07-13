import React, { useEffect } from "react";
// import QUERY_SINGLE_PROFILE from "../utils/queries";

export default function Account({ setIsNavOpen }) {
  useEffect(() => {
    setIsNavOpen(false);
  }, []);
  return (
    <div>
      <h1>Account</h1>
    </div>
  );
}
