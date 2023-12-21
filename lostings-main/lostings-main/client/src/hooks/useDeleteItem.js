import { useState } from "react";
import { useAuth } from "./auth-hook";
import { AuthContext } from "../context/auth-context";

function useDeleteItem() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const auth=useAuth(AuthContext);

  const deleteItemHandler = async (itemId) => {
    setIsDeleting(true);
    setError(null);
    console.log(itemId);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}item/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.ok) {
        alert("item deleted successfully");
      } else {
        const responseData = await response.json();
        console.error(`Error : ${responseData.message}`);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteItem: deleteItemHandler,
    isDeleting,
    error,
  };
}

export default useDeleteItem;
