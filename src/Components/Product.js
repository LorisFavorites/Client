import React from "react";

export default function Product(item) {
    const { index, classNames, images } = item;
    return (
        <>
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
                    Add to Favorites
                  </button>
                )}
              </label>
            );
          })}
        </>
    )
}