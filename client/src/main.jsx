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
import HomePage from "./pages/Homepage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Subscribe from "./pages/Subscribe.jsx";
import {
  getAllArticles,
  getArticleById,
  getArticlesByCategory,
} from "./services/articleService.js";

function ArticleFeedPage() {
  return null;
}
function RootLayout() {
  return (
    <div>
      {/* Navbar Component */}
      {/* <Outlet /> dynamic content based on the route */}
      {/* Footer component */}
    </div>
  );
}
function ArticleViewPage() {
  return null;
}

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
        index: true,
        element: <HomePage />,
        loader: async () => {
          try {
            const res = await getAllArticles();
            if (res.ok) {
              return res.data;
            }
          } catch (e) {}
        },
      },
      {
        path: "/:category",
        element: <ArticleFeedPage />,
        loader: async ({ params }) => {
          const { category } = params;
          try {
            const res = await getArticlesByCategory({ category });
            if (res.ok) {
              return res.data;
            }
          } catch (e) {}
        },
      },
      {
        path: "/:category/:subcategory",
        element: <ArticleFeedPage />,
        loader: async ({ params }) => {
          const { category, subcategory } = params;
          try {
            const res = await getArticlesByCategoryAndSubcategory({
              category,
              subcategory,
            });
            if (res.ok) {
              return res.data;
            }
          } catch (e) {}
        },
      },
      {
        path: "/:category/:subcategory/:id",
        element: <ArticleViewPage />,
        loader: async ({ params }) => {
          const { id } = params;
          try {
            const res = await getArticleById({
              id,
            });
            if (res.ok) {
              return res.data;
            }
          } catch (e) {}
        },
      },
      {
        path: "/staff",
        element: <AboutUs />,
      },
      { path: "/subscribe", element: <Subscribe /> },
    ],
  },
  {
    path: "*",
    element: <Subscribe />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
