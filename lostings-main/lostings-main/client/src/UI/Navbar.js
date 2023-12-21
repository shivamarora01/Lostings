import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const auth = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <nav className="bg-white outline outline-gray-300 outline-1 py-2 md:py-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center ">
          <span className="text-4xl font-black">
            <Link to="/">
              <span className="text-sky">LOST</span>
              <span className="text-navy">INGS</span>
            </Link>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 font-medium text-gray-500">
          <ul className="flex items-baseline space-x-6">
            <li className="border-4 border-white hover:border-b-sky py-3 px-2">
              <Link to="about">About</Link>
            </li>
            <li className="border-4 border-white hover:border-b-sky py-3 px-2">
              <Link to="items/lost">Lost Items</Link>
            </li>
            <li className="border-4 border-white hover:border-b-sky py-3 px-2">
              <Link to="items/found">Found Items</Link>
            </li>
            <li className="border-4 border-white hover:border-b-sky py-3 px-2">
              <Link to="item/new">Report New Item</Link>
            </li>
          </ul>
          <ul className="flex space-x-6">
            {!auth.isLoggedIn && (
              <>
                <li>
                  <Link to="login">
                    <button className="bg-sky hover:bg-navy text-white px-4 py-2 rounded">
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="register">
                    <button className="bg-sky hover:bg-navy text-white px-4 py-2 rounded">
                      Signup
                    </button>
                  </Link>
                </li>
              </>
            )}
            {auth.isLoggedIn && (
              <>
                {auth.userId && (
                  <li className="border-4 border-white hover:border-b-sky p-2">
                    <Link className="text-xl" to="profile">
                      {" "}
                      <FontAwesomeIcon icon={faUser} />
                    </Link>
                  </li>
                )}
                <li className="py-2">
                  <button
                    onClick={auth.logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="md:hidden">
          {mobileMenuOpen ? (
            <button
              className="text-gray-700 font-bold mx-2"
              onClick={handleMobileMenuToggle}
            >
              X
            </button>
          ) : (
            <button className="text-gray-700 " onClick={handleMobileMenuToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white font-medium text-gray-500 m-2">
          <ul className="">
            <li className="border-4 border-white py-1 px-2">
              <Link to="about">About</Link>
            </li>
            <li className="border-4 border-white py-1 px-2">
              <Link to="items/lost">Lost Items</Link>
            </li>
            <li className="border-4 border-white py-1 px-2">
              <Link to="items/found">Found Items</Link>
            </li>
            <li className="border-4 border-white py-1 px-2">
              <Link to="item/new">Report New Item</Link>
            </li>
          </ul>
          <ul className="space-y-2">
            {!auth.isLoggedIn && (
              <>
                <li>
                  <Link to="login">
                    <button className="bg-sky hover:bg-navy text-white px-4 py-2 rounded">
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="register">
                    <button className="bg-sky hover:bg-navy text-white px-4 py-2 rounded">
                      Signup
                    </button>
                  </Link>
                </li>
              </>
            )}
            {auth.isLoggedIn && (
              <>
                {auth.userId && (
                  <li className="border-4 border-white p-2 ">
                    <Link className="text-xl" to="profile">
                      {" "}
                      <FontAwesomeIcon icon={faUser} />
                    </Link>
                  </li>
                )}
                <li className="">
                  <button
                    onClick={auth.logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
