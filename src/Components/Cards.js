import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import { QUERY_INVENTORY } from "../utils/queries";

export default function Cards({ setIsNavOpen }) {
  useEffect(() => {
    setIsNavOpen(false);
  }, []);
  return <h1>Hello</h1>;
}
