import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("contact",contact);
    formData.append("avatar",avatar);

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}register`, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      navigate("/");
      const responseData = await response.json();
      auth.login(responseData.userId, responseData.token);
    } else {
      const responseData = await response.json();
      setError(responseData.message);
    }
  };
  if (auth.isLoggedIn) {
    navigate("/");
  }
  return (
    <div className="m-auto p-4 grid md:grid-cols-2 items-center justify-items-center h-[calc(100vh-74px)]">
      <div className="lg:w-1/2 p-4 hidden lg:block text-center">
        <h2 className="text-4xl font-bold mb-4 text-sky">
          Welcome to Lostings
        </h2>
        <p className="text-lg mb-2 text-navy">
          Report lost items or find what you've lost.
        </p>
        <p className="text-lg mb-2 text-navy">
          Please signup to create a new account.
        </p>
      </div>
      <div className="md:w-3/4 max-w-3xl bg-white text-navy font-bold rounded-2xl drop-shadow-2xl py-4 px-8">
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label className="block text-md font-semibold">Name</label>
          <input
            type="text"
            className="h-9 rounded-xl w-full my-2 p-2 border font-medium rounded mb-4 outline-none text-gray-700 bg-blue-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block text-md font-semibold">Email</label>
          <input
            type="text"
            className="h-9 rounded-xl w-full my-2 p-2 border font-medium rounded mb-4 outline-none text-gray-700 bg-blue-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block text-md font-semibold">Password</label>
          <input
            type="password"
            className="h-9 rounded-xl w-full my-2 p-2 border font-medium rounded mb-4 outline-none text-gray-700 bg-blue-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="block text-md font-semibold">Contact</label>

          <input
            type="text"
            className="h-9 rounded-xl w-full my-2 p-2 border font-medium rounded mb-4 outline-none text-gray-700 bg-blue-50"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <label className="block text-md font-semibold">Avatar</label>
          <input
            type="file"
            className="h-9 rounded-xl w-full my-2 p-2 text-sm border font-medium rounded mb-4 outline-none text-gray-700 bg-blue-50"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <button
            type="submit"
            className="w-full font-medium bg-sky hover:bg-navy text-white p-2 my-4 rounded-lg"
          >
            Sign Up
          </button>
          <p className="text-center text-sm font-light mt-4">Already have an account?</p>
          <Link to="/login"><button
            className="w-full font-medium outline outline-green-600 outline-1 text-green-600 hover:outline-none hover:bg-green-600 hover:text-white p-2 mt-2 mb-6 rounded-lg"
          >
            Login
          </button></Link>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
