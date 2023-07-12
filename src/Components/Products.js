import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { QUERY_INVENTORY } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function Products(props) {
  // const { data } = props;
  const [cards, setCards] = useState([]);
  const { loading, data, error } = useQuery(QUERY_INVENTORY, {
    variables: { inventory: "pokecards" },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
  }

  const cardsData = data.getInventory[0].cards.slice(0, 10);
  console.log(cardsData);

  return (
    <div className="products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center m-4">
        {cardsData.map((card, index) => {
          return (
            <div
              key={index}
              className="bg-gray-200 p-4 h-96"
              style={{
                backgroundImage: `url(${card.itemId.images.small})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            >
              {card.itemId.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
