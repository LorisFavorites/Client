import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Products(props) {
  const { data } = props;
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [cards, setCards] = useState([]);
  const [splicedCards, setSplicedCards] = useState([]);
  const cardsArray = [];


  useEffect(() => {
    if (cards) {
      setIsLoading(false); // Mark loading as false when data is available
      sortCards();
    }
  }, []);

  const sortCards = () => {
    let sortedCards = data.filter((card) => {
      if (card.cardmarket) {
        return card
      }
    }).sort((a, b) => {
      const aPrice = a.cardmarket.prices.averageSellPrice;
      const bPrice = b.cardmarket.prices.averageSellPrice;

      if (aPrice < bPrice) {
        return 1;
      }
      if (aPrice > bPrice) {
        return -1;
      }

      return 0;
    })
    setCards(sortedCards.slice(0, 10));
    console.log("Cards:", cards);
  }
};