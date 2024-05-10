import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import AuthProvider from "./AuthProvider";
import UserProvider from "./UserProvider";

function RootLayout() {
  return (
    <div>
      <AuthProvider>
        <UserProvider>
          <NavBar />
          <Outlet />
        </UserProvider>
      </AuthProvider>
      {/* Footer component */}
    </div>
  );
}

export default RootLayout;
