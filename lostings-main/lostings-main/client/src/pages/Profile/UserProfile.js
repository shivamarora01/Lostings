import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserProfile = () => {
  const auth = useContext(AuthContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.isLoggedIn) {
        return;
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
          console.log(userData.user);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [auth.token]);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleUpdateProfile = async (e) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}me/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        console.log("sucesful");
        const responseData = await response.json();
        setUser({
          name: responseData.user.name,
          email: responseData.user.email,
          contact: responseData.user.contact,
        });
        setShowUpdateProfile(false);
      } else {
        console.error("Error updating user profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}password/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData),
        }
      );
      if (response.ok) {
        console.log(`successfully changed pw`);
        setShowChangePassword(false);
      } else {
        console.error("Error changing password:", response.statusText);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md">
      <h2 className="text-navy text-5xl text-center font-bold p-4">
        User Profile
      </h2>
      <div className="mb-4 flex items-center p-8">
        <img
          src={user.avatar?user.avatar.url:"https://via.placeholder.com/150"}
          alt="Profile"
          className="rounded-full mr-4 h-48 w-48"
        />
        <div className="p-4 text-xl">
          <p className="py-2">
            <span className="font-bold text-navy">Name:</span>{" "}
            <span className="text-navy text-lg">{user.name}</span>
          </p>
          <p className="py-2">
            <span className="font-bold text-navy">Email:</span>{" "}
            <span className="text-navy text-lg">{user.email}</span>
          </p>
          <p className="py-2">
            <span className="font-bold text-navy">Contact:</span>{" "}
            <span className="text-navy text-lg">{user.contact}</span>
          </p>
        </div>
      </div>
      <hr></hr>

      <div className="px-12 py-4">
        <div className="flex justify-between">
          <h2 className="text-left text-xl text-navy font-extrabold">
            Update Profile
          </h2>
          <button
            className="text-right text-3xl text-navy font-extrabold"
            onClick={() => setShowUpdateProfile(!showUpdateProfile)}
          >
            {showUpdateProfile ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </button>
        </div>

        {showUpdateProfile && (
          <div className="text-navy my-4">
            <form onSubmit={handleUpdateProfile}>
              <label className="font-semibold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={updatedUser.name}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
                }
                className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
              />
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={updatedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
                className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
              />
              <label className="font-semibold" htmlFor="contact">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                value={updatedUser.contact}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, contact: e.target.value })
                }
                className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
              />
              <button
                type="submit"
                className="bg-sky hover:bg-navy text-white px-4 py-2 rounded"
              >
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
      <hr></hr>

      <div className="px-12 py-4">
        <div className="flex justify-between">
          <h2 className="text-left text-xl text-navy font-extrabold ">
            Change Password
          </h2>
          <button
            className="text-right text-3xl text-navy font-extrabold"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            {showChangePassword ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </button>
        </div>
        {showChangePassword && (
          <div className="text-navy my-4">
            <form onSubmit={handleChangePassword}>
              <label className="font-semibold" htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
              />
              <label className="font-semibold" htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
              />
              <label className="font-semibold" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
              />
              <button
                type="submit"
                className="bg-sky hover:bg-navy text-white px-4 py-2 rounded"
              >
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
