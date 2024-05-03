import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import UserProvider from "./UserProvider";

function RootLayout() {
  return (
    <div>
      <UserProvider>
        <NavBar />
        <Outlet />
      </UserProvider>
      {/* Footer component */}
    </div>
  );
}

export default RootLayout;
