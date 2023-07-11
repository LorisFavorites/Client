import React, { useEffect, useState } from "react";

export default function Cards({ setIsNavOpen }) {
  useEffect(() => {
    setIsNavOpen(false);
  }, []);
}

