import { useEffect, useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Card from "../../UI/Card";
import useDeleteItem from "../../hooks/useDeleteItem";
import { useAuth } from "../../hooks/auth-hook";
import { AuthContext } from "../../context/auth-context";
const LostItems = (props) => {
  const auth = useAuth(AuthContext);
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleteItem, isDeleting, error } = useDeleteItem();
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      fetchLostItems();
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const fetchLostItems = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}items/lost`)
      .then((response) => response.json())
      .then((data) => {
        setLostItems(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchLostItems();
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
        fetchLostItems();
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
      <h1 className="text-4xl text-navy text-center font-extrabold m-8">
        Lost Items
      </h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 justify-between justify-items-center gap-12 px-8 ">
          {lostItems.map((item) => (
            <Card
              key={item._id}
              isCreator={item.creator === auth.userId}
              item={item}
              creator={item.creator}
              onDelete={() => handleDeleteItem(item._id)}
              changeStatus={()=>changeStatus(item._id, item.status)}
            ></Card>
          ))}
        </ul>
      )}
    </div>
  );
};
export default LostItems;
