import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { QUERY_INVENTORY } from "../utils/queries";
import { useQuery } from "@apollo/client";

export default function Products(props) {
  const { data } = props;
  const [cards, setCards] = useState([]);
  const [splicedCards, setSplicedCards] = useState([]);
  const cardsArray = [];

  const { loading, data1, error } = useQuery(QUERY_INVENTORY);
  console.log("data1", data1);

  useEffect(() => {
    if (cards) {
      setIsLoading(false); // Mark loading as false when data is available
      sortCards();
    }
  }, []);

  const sortCards = () => {
    let sortedCards = data
      .filter((card) => {
        if (card.cardmarket) {
          return card;
        }
      })
      .sort((a, b) => {
        const aPrice = a.cardmarket.prices.averageSellPrice;
        const bPrice = b.cardmarket.prices.averageSellPrice;

        if (aPrice < bPrice) {
          return 1;
        }
        if (aPrice > bPrice) {
          return -1;
        }

        return 0;
      });
    setCards(sortedCards.slice(0, 10));
    console.log("Cards:", cards);
  };

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  const { inventories } = data1;

  console.log("inventories", inventories);

  return <div className="products">Products</div>;
}