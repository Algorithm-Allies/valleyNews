import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login, { action as LoginAction } from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthLayout from "./components/Auth/AuthLayout.jsx";
import NewPassword, {
  action as NewPasswordAction,
} from "./pages/NewPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
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
      },
      {
        path: "/auth/new-password",
        element: <NewPassword />,
        errorElement: <NewPassword />,
        action: NewPasswordAction,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
