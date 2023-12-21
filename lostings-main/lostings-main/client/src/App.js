import React from "react";
import LostItems from "./pages/LostItems/LostItems";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./UI/Navbar";
import FoundItems from "./pages/FoundItems/FoundItems";
import Login from "./pages/Auth/Login";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import Signup from "./pages/Auth/Signup";
import ReportNewItem from "./pages/NewItem/ReportNewItem";
import MyItems from "./utils/MyItems";
import Item from "./utils/Item";
import UpdateItem from "./utils/UpdateItem";
import UserProfile from "./pages/Profile/UserProfile";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import About from "./pages/About/About";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
const NavbarWrapper = () => {
  return (
    <div className="bg-back min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "items",
        children: [
          {
            path: "lost",
            element: <LostItems />,
          },
          {
            path: "found",
            element: <FoundItems />,
          },
          {
            path: "me",
            element: <MyItems />,
          },
        ],
      },
      {
        path: "about",
        // element: <About/>
      },
      {
        path: "item",
        children: [
          {
            path: "new",
            element: <ReportNewItem />,
          },
          {
            path: ":id",
            element: <Item />,
          },
          {
            path: "update/:id",
            element: <UpdateItem />,
          },
        ],
      },
      {
        path: "/password",
        children: [
          {
            path: "forgot",
            element: <ForgotPassword />,
          },
          {
            path: "reset/:token",
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const { token, login, logout, userId } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      {/* <HomePage/>
       <LostItems/>
       <FoundItems/>
       <Login/>
       <Signup/>
       <ReportNewItem/>
       <MyItems/>
      <UpdateItem/>

       <Item/>
       <DeleteItem/>
       <UserProfile/>
       <ForgotPassword/>
       <ResetPassword/> */}
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
