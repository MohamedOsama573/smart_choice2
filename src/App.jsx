import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Compare } from "./Components/Compare/Compare";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import { Layout } from "./Components/Layout/Layout";
import { Login } from "./Components/Login/Login";
import { Notfound } from "./Components/Notfound/Notfound";
import Otp from "./Components/Otp/Otp";
import { Register } from "./Components/Register/Register";
import Details from "./pages/Details/Details";
import MobileDetails from "./pages/Details/MobileDetails";
import TabletDetails from "./pages/Details/TabletDetails";
import TelevisionDetails from "./pages/Details/TelevisionDetails";
import { Home } from "./pages/Home/Home";
import Wishlist from "./pages/Wishlist/Wishlist";
import LandingPage from "./pages/LandingPage/LandingPage";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/products", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "/otp", element: <Otp /> },
      { path: "compare", element: <Compare /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "/Laptop/product/:id", element: <Details /> },
      { path: "/Mobile/product/:id", element: <MobileDetails /> },
      { path: "/Tablet/product/:id", element: <TabletDetails /> },
      { path: "/Television/product/:id", element: <TelevisionDetails /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="http://196489907512-gmb5k559p3ismp0ltgidulecmad9koga.apps.googleusercontent.com">
        <ToastContainer />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
