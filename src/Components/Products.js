import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Products(props) {
  const { data } = props;
  const [cards, setCards] = useState([]);

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
    console.log("Sort:", sortedCards);
    setCards(sortedCards);
    // setSplicedCards(cards.slice(0, 50));
  };

  return (
    <>
      <div className="products">
        <div className="testimonials">
          {cards.slice(0, 50).map((testimonial, index) => {
            const classNames = `item active`;

            return (
              <label
                key={index}
                className={classNames}
                htmlFor={`t-${testimonial}`}
                style={{ backgroundImage: `url(${testimonial.images.small})` }}
              ></label>
            );
          })}
        </div>      
      </div>
    </>
  );
}

// Add card for each pokemon that we want to display
// I would recommend using grabbing 50-75 cards to display from the data
// When displaying price on cards, try and use the highest price that is in the data
// The only thing you need to grab for the card itself should be the image and then grab the price data and the name for the product card
