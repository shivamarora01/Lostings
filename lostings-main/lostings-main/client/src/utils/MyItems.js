import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";

const MyItems = () => {
  const auth = useContext(AuthContext);
  const [lostItems, setLostItems] = useState([]);
  const [lostLoading, setLostLoading] = useState(true);
  const [foundItems, setFoundItems] = useState([]);
  const [foundLoading, setFoundLoading] = useState(true);
  useEffect(() => {
    if (!auth.isLoggedIn) {
      setFoundLoading(false);
      setFoundItems([]);
      return;
    }
    fetch(`${process.env.REACT_APP_BASE_URL}items/me/found`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error fetching data:", response.statusText);
          setFoundLoading(false);
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        setFoundItems(data.items);
        setFoundLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setFoundLoading(false);
      });
  }, [auth.isLoggedIn, auth.token]);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      setLostLoading(false);
      setLostItems([]);
      return;
    }
    fetch(`${process.env.REACT_APP_BASE_URL}items/me/lost1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error fetching data:", response.statusText);
          setLostLoading(false);
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        setLostItems(data.items);
        setLostLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLostLoading(false);
      });
  }, [auth.isLoggedIn, auth.token]);

  return (
    <div>
      <h2>My Items</h2>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Lost Items</h1>
        {lostLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {lostItems.map((item) => (
              <li key={item._id}>
                {item.tag} {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Found Items</h1>
        {foundLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {foundItems.map((item) => (
              <li key={item._id}>
                {item.tag} {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyItems;
