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
import NewsPage from "./pages/NewsPage.jsx";
import Subscribe from "./pages/Subscribe.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import RootLayout from "./components/RootLayout.jsx";
import CreateArticle from "./pages/CreateArticle.jsx";
import BusinessPanel from "./pages/BusinessPanel.jsx";
import Users from "./pages/Users.jsx";
import AddUser from "./pages/AddUser.jsx";

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
      },
      {
        path: "/auth/home",
        element: <NewsPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/:category",
        element: <NewsPage />,
      },
      {
        path: "/:category/:subcategory",
        element: <NewsPage />,
      },
      {
        path: "/:category/:subcategory/:id",
        element: <ArticlePage />,
      },
      {
        path: "/staff",
        element: <AboutUs />,
      },
      { path: "/subscribe", element: <Subscribe /> },
      { path: "/createarticle", element: <CreateArticle /> },
      { path: "/businesspanel", element: <BusinessPanel /> },
      { path: "/users", element: <Users /> },
      { path: "/adduser", element: <AddUser /> },
      {
        path: "/not-found",
        element: <PageNotFound />,
      },
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
