import React, { useEffect, useState } from "react";
import Products from "./Products";
import Loading from "./Loading";
import { QUERY_INVENTORY } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../utils/mutations";

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

  const addtoFavorites = async (favorite) => {
    console.log(favorite);
    alert("Added to Favorites!");
    try {
      const result = await addFavorite({ variables: { favorite: favorite } });

      console.log(result);
    } catch(err) {
      console.log(err);
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
              <label
                key={index}
                className={classNames}
                htmlFor={`t-${index}`}
                style={{ backgroundImage: `url(${daily.itemId.images.small})` }}
                onClick={(event) => handleClick("curr", index)}
              >
                {isActive && (
                  <button
                    className="favorites-btn btn btn-primary"
                    onClick={addtoFavorites}
                  >
                    Add to Favorites
                  </button>
                )}
                <button
                  className="favorites-btn btn btn-primary"
                  onClick={(event) => addtoFavorites(daily.itemId._id)}
                >
                  <i className="far fa-heart"></i>
                </button>
              </label>
            );
          })}
        </div>
      </div>
      <div className="buttons">
        <button
          className="prev-button"
          onClick={(event) => handleClick("prev", -1)}
        >
          {/* <i className="fa-solid fa-chevron-left"></i> */}
        </button>
        <button
          className="next-button"
          onClick={(event) => handleClick("next", 1)}
        >
          {/* <i className="fa-solid fa-chevron-right"></i> */}
        </button>
      </div>

      <Products />
    </>
  );
}
