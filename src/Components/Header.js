import React, { useEffect, useState } from "react";
import Products from "./Products";
import Loading from "./Loading";
import Deals from "./Deals";
import { QUERY_INVENTORY } from "../utils/queries";
import { useQuery } from "@apollo/client";


export default function Header(props) {
  const { isNavOpen, setIsNavOpen } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, error, data } = useQuery(QUERY_INVENTORY, {
    variables: { inventory: "pokecards" }
  });
  
  useEffect(() => {
    setIsNavOpen(false);
  }, [isNavOpen]);
  
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return console.log("Error! ", error.message);
  }

  const handleClick = (indx, incr) => {
    if (indx === 'curr') {
      setCurrentIndex(incr);
    } else {
      if ( (currentIndex ==  0 && incr < 0) || (currentIndex == 4 && incr > 0) ) {
        return;
      }
      setCurrentIndex(currentIndex + incr);
    }
  };

  const addtoFavorites = () => {
    alert("Added to Favorites!");
  }

  const dailyDeals = data.getInventory[0].cards.slice(0,5);

  console.log(dailyDeals)

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
                onClick={(event) => handleClick('curr', index)}
              >
                {isActive && (
              <button className="favorites-btn btn btn-primary" onClick={addtoFavorites}>
                <i className="far fa-heart"></i>
              </button>
                )}
              </label>
            );
          })}
        </div>
      </div>
      <div className="buttons">
        <button className="prev-button" onClick={(event) => handleClick('prev', -1)}>
          {/* <i className="fa-solid fa-chevron-left"></i> */}
        </button>
        <button className="next-button" onClick={(event) => handleClick('next', 1)}>
          {/* <i className="fa-solid fa-chevron-right"></i> */}
        </button>
      </div>

      <Products />
    </>
  );
};
