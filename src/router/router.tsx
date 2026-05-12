import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Login from "../Pages/Auth/Login";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Lineage from "../Pages/Lineage";
import RoyalExchange from "../Pages/RoyalExchange";
import BookPage from "../Pages/BookPage";
import ContactPage from "../Pages/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/lineage",
        element: <Lineage />,
      },
      {
        path: "/royal-exchange",
        element: <RoyalExchange />,
      },
      {
        path: "/royal-exchange",
        element: <RoyalExchange />,
      },
      {
        path: "/book",
        element: <BookPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
    ],
  },
]);

export default router;
