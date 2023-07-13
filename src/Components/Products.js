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

  if (loading) {
    return <Loading />;
  }

  // Getting all cards that have a price greater than $30
  const filteredCards = data.getInventory[0].cards.filter(
    (card) => card.itemId.cardmarket.prices.trendPrice > 30
  );

  // Slicing filteredCards to only show the first 15 cards enough for 5 rows while fullscreen
  const cardsData = filteredCards.slice(0, 15);

  return (
    <div className="relative w-screen bg-neutral-800 border-2 h-max">
      <div className="products w-3/4 mx-auto h-auto">
        <h1 className="text-center text-amber-50 text-2xl font-bold m-5">
        █████ <span className="text-red-500">█████</span> ███ ████ | ポケモンゲットだぜ! 
        </h1>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center m-5">
          {cardsData.map((card, index) => {
            return (
              <div key={index} className="relative h-128 inset-x-0">
                <div>
                  <img
                    src={card.itemId.images.small}
                    alt="card"
                    className="absolute left-1/2 -translate-x-2/4 top-0 h-3/4 rounded-md"
                  />
                </div>
                <div>
                  <p className="text-amber-50 font-bold absolute bottom-14 inset-x-0">
                    ${card.itemId.cardmarket.prices.trendPrice.toFixed(2)}
                  </p>
                  <br />
                  <br />
                  <button className="absolute rounded-md bottom-3 left-1/2 -translate-x-2/4 inset-x-0 bg-red-500 hover:bg-red-900 hover:text-amber-50 p-2 text-xs w-6/12">
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
