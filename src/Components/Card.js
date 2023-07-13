import React from "react";

export default function Card(props) {
    const { card, index, image, price } = props;

    return (
        <div key={index} className="relative h-128 inset-x-0">
            <div>
                <img
                src={ (card.itemId) ? card.itemId.images.small : image }
                alt="card"
                className="absolute left-1/2 -translate-x-2/4 top-0 h-3/4"
                />
            </div>
            <div>
                <p className="absolute bottom-14 inset-x-0">
                ${ (card.itemId) ? card.itemId.cardmarket.prices.trendPrice.toFixed(2) : price}
                </p>
                <br />
                <br />
                <button className="absolute bottom-3 left-1/2 -translate-x-2/4 inset-x-0 rounded-none bg-red-600 p-2 text-xs w-6/12">
                Add to cart
                </button>
            </div>
        </div>
    );
}