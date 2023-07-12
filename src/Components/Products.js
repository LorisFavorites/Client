import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { QUERY_INVENTORY } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function Products(props) {
  // const { data } = props;
  const [cards, setCards] = useState([]);
  const { loading, error, data } = useQuery(QUERY_INVENTORY, {
    variables: { inventory: "pokecards" }
  });

  if (loading) return 'loading...'
  if (error) return error.message;
  
  console.log(data);

  return (
    <div className="products">
      {data.getInventory[0].cards.map((card, index) => {
        return (
          <div key={index}>
            {card.itemId.name}
          </div>)
      })}
    </div>
  );
}
