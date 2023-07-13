import React, { useEffect, useState } from "react";
import Products from "./Products";
import Loading from "./Loading";
import { QUERY_INVENTORY } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../utils/mutations";
import Card from "./Card";

export default function Header(props) {
  const { isNavOpen, setIsNavOpen } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, error, data } = useQuery(QUERY_INVENTORY, {
    variables: { inventory: "pokecards" },
  });
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);

  useEffect(() => {
    setIsNavOpen(false);
    document.documentElement.style.overflow = "auto"; // Enable scrolling
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return console.log("Error! ", error.message);
  }

  const handleClick = (indx, incr) => {
    if (indx === "curr") {
      setCurrentIndex(incr);
    } else {
      if ((currentIndex == 0 && incr < 0) || (currentIndex == 4 && incr > 0)) {
        return;
      }
      setCurrentIndex(currentIndex + incr);
    }
  };

  const dailyDeals = data.getInventory[0].cards.slice(0, 5);

  console.log(dailyDeals);

  return (
    <>
      <div className="slider">
        <div className="testimonials">
          {dailyDeals.map((daily, index) => {
            const isActive = index === currentIndex;
            const classNames = `item ${isActive ? "active" : ""}`;

            return (
              <Card 
                card={daily.itemId}
                isDaily={true}
                index={index}
                image={daily.itemId.images.small}
                classNames={classNames}
                handleClick={handleClick}
                isActive={isActive}
              />
            );
          })}
        </div>
      </div>
      <div className="buttons">
        <button
          className="prev-button"
          onClick={(event) => handleClick("prev", -1)}
        />
        <button
          className="next-button"
          onClick={(event) => handleClick("next", 1)}
        />
      </div>

      <Products />
    </>
  );
}
