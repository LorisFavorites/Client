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
    }
    sortCards();
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
    // console.log("Sort:", sortedCards);
    setCards(sortedCards);
  };

  useEffect(() => {
    // console.log("Cards:", cards);
    setSplicedCards(cards.slice(0, 50));
    // console.log("Spliced:", splicedCards);
    cardsArray.push(splicedCards);
    setSplicedCards([]);
  }, []);

  return (
    <>
      <div className="products">
        <h1>Products</h1>
      </div>
    </>
  );
}

// Add card for each pokemon that we want to display
// I would recommend using grabbing 50-75 cards to display from the data
// When displaying price on cards, try and use the highest price that is in the data
// The only thing you need to grab for the card itself should be the image and then grab the price data and the name for the product card
