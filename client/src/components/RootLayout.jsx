import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function RootLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* Footer component */}
    </div>
  );
}

export default RootLayout;
