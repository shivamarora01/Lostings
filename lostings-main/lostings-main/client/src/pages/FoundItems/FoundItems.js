import { useEffect, useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Card from "../../UI/Card";
import useDeleteItem from "../../hooks/useDeleteItem";
import { useAuth } from "../../hooks/auth-hook";
import { AuthContext } from "../../context/auth-context";
const FoundItems = (props) => {
  const auth = useAuth(AuthContext);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleteItem, isDeleting, error } = useDeleteItem();
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      fetchFoundItems();
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const fetchFoundItems = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}items/found`)
      .then((response) => response.json())
      .then((data) => {
        setFoundItems(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchFoundItems();
  }, []);
  const changeStatus = async (id, oldStatus) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}item/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          status: !oldStatus,
        }),
      });
      if (response.ok) {
        console.log("updated successfully");
        fetchFoundItems();
      } else {
        const responseData = await response.json();
        alert(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  return (
    <div>
      <h1 className="text-4xl text-navy text-center font-extrabold m-8">Found Items</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 justify-between justify-items-center gap-12 ">
          {foundItems.map((item) => (
            <Card
              key={item._id}
              isCreator={item.creator === auth.userId}
              item={item}
              onDelete={() => handleDeleteItem(item._id)}
              changeStatus={()=>changeStatus(item._id, item.status)}
            ></Card>
          ))}
        </ul>
      )}
    </div>
  );
};
export default FoundItems;
