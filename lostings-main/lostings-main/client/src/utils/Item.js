import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Item = () => {
  const [data, setData] = useState(null);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}item/${params.id}`);
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.item);
      }
    }
    fetchData();
  }, []);
  return <div>{data && <h1>{data.tag}</h1>}</div>;
};

export default Item;
