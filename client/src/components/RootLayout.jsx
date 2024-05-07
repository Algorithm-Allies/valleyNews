import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import UserProvider from "./UserProvider";
import { validUrl } from "../lib/validUrl";

function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/news");
      return;
    }
    if (!validUrl(location.pathname)) {
      navigate("/not-found");
    }
  }, []);

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
