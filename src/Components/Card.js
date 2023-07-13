import React from "react";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../utils/mutations";
import { useMutation } from "@apollo/client";

export default function Card(props) {
    const { card, index, image, price, isFav, style, classNames } = props;
    const [addFavorite] = useMutation(ADD_FAVORITE);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE);

    const handleFavorite = async (favorite) => {
        console.log(favorite);
        try {
            if (isFav) {
                const result = await removeFavorite({ variables: { favorite: favorite } });
                alert("Favorite removed!");
            } else {
                const result = await addFavorite({ variables: { favorite: favorite } });
                alert("Favorite added!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addToFavorites = async (favorite) => {

    }

    // const remo

    return (
        <>
        <div key={index} className={classNames ? classNames : "relative h-128 inset-x-0"}>
                <button
                  className="favorites-btn btn btn-primary"
                >
                  <i className="far fa-heart"></i>
                </button>
            <div>
                <img
                src={ (card.itemId) ? card.itemId.images.small : image }
                alt="card"
                className="absolute left-1/2 -translate-x-2/4 top-0 h-3/4 rounded-md"
                />
            </div>
            {isFav ? 
            <div>
                <button 
                    className="absolute bottom-3 left-1/2 -translate-x-2/4 inset-x-0 rounded-none bg-red-600 p-2 text-s font-bold w-6/12"
                    onClick={() => handleFavorite(card._id || card.itemId._id)}
                >
                    Remove favorite
                </button>    
            </div>
            :
            <div>
                <p className="text-amber-50 font-bold absolute bottom-14 inset-x-0">
                ${ (card.itemId) ? card.itemId.cardmarket.prices.trendPrice.toFixed(2) : price}
                </p>
                <br />
                <br />
                <button 
                    className="absolute bottom-3 left-1/2 -translate-x-2/4 inset-x-0 rounded-none bg-red-600 p-2 text-s font-bold w-6/12"
                    onClick={() => handleFavorite(card._id || card.itemId._id)}
                    >
                Add to favorites
                </button>
            </div> 
            }
        </div>
        </>
    );
}