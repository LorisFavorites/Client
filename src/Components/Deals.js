import React from "react";

export default function Deals(props) {

        return(
            <>
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
        </>
      )
}