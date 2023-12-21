import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";

const ReportNewItem = () => {
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [lastSeenLocation, setLastSeenLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState("lost");
  const auth = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tag", tag);
    formData.append("location", lastSeenLocation);
    formData.append("description", description);
    formData.append("datetime", dateTime);
    formData.append("type", type);
    formData.append("image", image);
    console.log([...formData]);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}item/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData
      });

      if (response.ok) {
        alert("Item reported successfully!");
      } else {
        const responseData = await response.json();
        alert(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error reporting item:", error);
    }
  };

  return (
    <div className="mx-auto p-4 grid md:grid-cols-5 content-center justify-items-center">
      <div className="text-3xl font-semibold col-span-2 my-auto rounded w-2/3 text-sky text-center hidden md:block">
        <p className="mb-2 content-center">
          Share the details of your lost or found item and help others recover
          their belongings.
        </p>
        <p className="mb-2 text-navy">
          Your contribution can make a difference!
        </p>
      </div>
      <div className="md:w-2/3 col-span-3 max-w-xl bg-white text-navy font-bold rounded-2xl drop-shadow-2xl p-8">
        <h2 className="text-center text-2xl mb-4">Report New Item</h2>
        <form onSubmit={handleFormSubmit} >
          <div className="my-6">
            <label className="block text-md font-semibold">Type</label>
            <select
              className="w-full p-2 border rounded bg-blue-50 outline-none text-gray-700 font-medium"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div className="my-6">
            <label className="block text-md font-semibold">Tag</label>
            <input
              className="w-full p-2 border rounded bg-blue-50 outline-none text-gray-700 font-medium"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label className="block text-md font-semibold">Description</label>
            <textarea
              className="w-full p-2 border rounded bg-blue-50 outline-none text-gray-700 font-medium"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label className="block text-md font-semibold">
              Last Seen Location
            </label>
            <input
              className="w-full p-2 border rounded bg-blue-50 outline-none text-gray-700 font-medium"
              type="text"
              value={lastSeenLocation}
              onChange={(e) => setLastSeenLocation(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label className="block text-md font-semibold">Date and Time</label>
            <input
              className="w-full p-2 border rounded bg-blue-50 outline-none text-gray-700 font-medium"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label className="block text-md font-semibold">Image</label>
            <input
              className="w-full p-2 border rounded bg-blue-50 outline-none text-gray-700 font-medium"
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button
            className="my-4 w-full bg-blue-500 text-white p-2 rounded shadow-2xl box-shadow-red-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportNewItem;
