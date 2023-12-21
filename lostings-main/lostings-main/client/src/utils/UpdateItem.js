import React, {  useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const Item = () => {
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [lastSeenLocation, setLastSeenLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState("lost");
  const auth = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}item/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            tag,
            location: lastSeenLocation,
            description,
            datetime: dateTime,
            type,
          }),
        }
      );
      if (response.ok) {
        console.log("updated successfully");
        navigate(-1);
      } else {
        const responseData = await response.json();
        alert(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="m-auto p-4 grid md:grid-cols-2 items-center justify-items-center h-[calc(100vh-74px)]">
      <div className="lg:w-1/2 p-4 hidden lg:block text-center">
        <h2 className="text-4xl font-bold mb-4 text-sky ">
          Welcome to Lostings
        </h2>
        <p className="text-lg text-navy mb-4">
          Update the details of the item to improve the chances of it being
          found or returned. Please provide as much accurate information as
          possible, including a clear description, the location where it was
          last seen, the date and time, and a relevant image. By updating these
          details, you can help us in our mission to reunite lost items with
          their owners or finders. Thank you for your assistance in making the
          lost and found process more effective and efficient.
        </p>
      </div>
      <div className=" bg-white flex items-center justify-center">
        <div className="text-navy rounded p-8 shadow-xl w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Update Item
          </h2>
          <form onSubmit={updateHandler}>
            <label className="font-semibold">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>

            <label className="font-semibold">Tag</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
            />

            <label className="font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
            />

            <label className="font-semibold">Last Seen Location</label>
            <input
              type="text"
              value={lastSeenLocation}
              onChange={(e) => setLastSeenLocation(e.target.value)}
              className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
            />

            <label className="font-semibold">Date and Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full h-9 rounded-lg my-2 p-2 border font-medium mb-4 outline-none text-gray-700 bg-blue-50"
            />

            <label className="font-semibold">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full h-9 rounded-lg my-2 p-2 border text-sm font-medium mb-4 outline-none text-gray-700 bg-blue-50"
            />

            <button
              type="submit"
              className="w-full font-medium bg-sky hover:bg-navy text-white p-2 my-4 rounded-lg"
            >
              Update Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Item;
