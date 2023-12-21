import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
const Modal = ({ creator, onClose }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}user/${creator}`
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
          console.log(userData.user);
          setLoading(false);
        } else {
          console.error("Error fetching user data:", response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
      <div className="bg-blue-50 p-6 rounded-lg">
        <button
          className="font-bold py-2 px-3 bg-gray-300 hover:bg-gray-400 rounded float-right"
          onClick={onClose}
        >
          X
        </button>
        <div className="p-6">
          <h2 className="text-2xl text-navy font-bold mb-4">Creator Details</h2>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <p className="text-md text-gray-700 font-medium py-0.5 ">{`Name: ${user.name}`}</p>
              <p className="text-md text-gray-700 font-medium py-0.5">{`Email: ${user.email}`}</p>
              <p className="text-md text-gray-700 font-medium py-0.5">{`Phone: ${user.contact}`}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
