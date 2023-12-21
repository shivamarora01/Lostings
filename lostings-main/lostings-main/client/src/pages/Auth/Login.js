import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      navigate("/");
      const responseData = await response.json();
      auth.login(responseData.userId,responseData.email, responseData.token);
      setError(null);
    } else {
      const responseData = await response.json();
      setError(responseData.message);
    }
  };

  if (auth.isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="m-auto p-4 grid md:grid-cols-2 items-center justify-items-center h-[calc(100vh-74px)] bg-back">
      <div className="lg:w-1/2 p-4 hidden lg:block text-center">
        <h2 className="text-4xl font-bold mb-4 text-sky">
          Welcome to Lostings
        </h2>
        <p className="text-lg mb-2 text-navy">
          Report lost items or find what you've lost.
        </p>
        <p className="text-lg mb-2 text-navy">Please login to access your account.</p>
      </div>
      <div className="md:w-1/2 max-w-sm bg-white text-navy font-bold rounded-2xl drop-shadow-2xl p-4">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="block text-md font-semibold">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
          />

          <label className="block text-md font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-9 my-2 p-2 border font-medium rounded-lg mb-4 outline-none text-gray-700 bg-blue-50"
          />
          <button
            type="submit"
            className="w-full font-medium bg-sky hover:bg-navy text-white p-2 my-4 rounded-lg"
          >
            Login
          </button>
          <p className="text-center text-sm font-light mt-4">Don't have an account yet?</p>
          <Link to="/register"><button
            className="w-full font-medium outline outline-green-600 outline-1 text-green-600 hover:outline-none hover:bg-green-600 hover:text-white p-2 mt-2 mb-6 rounded-lg"
          >
            Sign Up
          </button></Link>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
