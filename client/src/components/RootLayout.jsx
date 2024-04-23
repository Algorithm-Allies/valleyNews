import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import AuthProvider from "./AuthProvider";

function RootLayout() {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <Outlet />
        {/* Footer component */}
      </AuthProvider>
    </div>
  );
}

export default RootLayout;
