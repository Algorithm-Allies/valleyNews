import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login, { action as LoginAction } from "./pages/Login.jsx";
import Register, { action as RegisterAction } from "./pages/Register.jsx";
import AuthLayout from "./components/Auth/AuthLayout.jsx";
import ResetPassword, {
  action as ResetPasswordAction,
} from "./pages/ResetPassword.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import NewPassword, {
  action as NewPasswordAction,
} from "./pages/NewPassword.jsx";
import AboutUs from './pages/AboutUs.jsx'

import NewsPage from "./pages/NewsPage.jsx";
import BusinessPanel from "./pages/Business/BusinessPanel.jsx";
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        loader: () => {
          // redirecting user because /auth is not a route
          return redirect("/auth/login");
        },
      },
      {
        path: "/auth/login",
        element: <Login />,
        errorElement: <Login />,
        action: LoginAction,
      },
      {
        path: "/auth/register",
        element: <Register />,
        errorElement: <Register />,
        action: RegisterAction,
      },
      {
        path: "/auth/new-password",
        element: <NewPassword />,
        errorElement: <NewPassword />,
        action: NewPasswordAction,
      },
      {
        path: "/auth/reset",
        element: <ResetPassword />,
        errorElement: <ResetPassword />,
        action: ResetPasswordAction,
      },{
        path: "/auth/home",
        element: <NewsPage/>
      },
      {
        path: "/auth/about-us",
        element: <AboutUs />
      },
      {
        path: "/auth/business/dashboard",
        element: <BusinessPanel />
      }
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
