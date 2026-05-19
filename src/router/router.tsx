import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Lineage from "../Pages/Lineage";
import RoyalExchange from "../Pages/RoyalExchange";
import BookPage from "../Pages/BookPage";
import ContactPage from "../Pages/ContactPage";
import Services from "../Pages/Services";
import Shop from "../Pages/Shop";
import { ShopDetailsPage } from "../Pages/ShopDetails";
import Cart from "../Pages/Cart";
import { Login } from "../Pages/Auth/Login";
import { Signup } from "../Pages/Auth/SignUp";
import { SignupOtp } from "../Pages/Auth/SignupOtp";
import { ForgotOtp } from "../Pages/Auth/ForgotOtp";
import { ForgotPassword } from "../Pages/Auth/ForgotPassword";
import { ResetPassword } from "../Pages/Auth/ResetPassword";


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
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:slug",
        element: <ShopDetailsPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
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
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signup-otp",
        element: <SignupOtp  />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword  />,
      },
      {
        path: "forgot-otp",
        element: <ForgotOtp  />,
      },
      {
        path: "reset-password",
        element: <ResetPassword   />,
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
