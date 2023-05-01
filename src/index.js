import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MyOrders, { fetchOrderedItems } from "./components/pages/MyOrders";
import RootLayout from "./components/Layout/RootLayout";
import ErrorPage from "./components/pages/ErrorPage";
import LoginPage, { loginAction } from "./components/pages/Login";
import SignUpPage, { signupAction } from "./components/pages/SignUp";
import { LogoutHandler } from "./components/pages/Logout";
import { tokenLoader } from "./util/authToken";
import { fetchMealItems } from "./components/Meals/MealItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root-loader",
    loader: tokenLoader,
    children: [
      { path: "/", element: <LoginPage />, action: loginAction },
      { path: "/items", element: <App /> ,loader:fetchMealItems},
      { path: "/signup", element: <SignUpPage />, action: signupAction },
      { path: "/orders", element: <MyOrders />, loader: fetchOrderedItems },
    ],
  },
  {
    path: "/logout",
    action: LogoutHandler,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
