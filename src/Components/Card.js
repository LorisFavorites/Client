import React from "react";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../utils/mutations";
import { useMutation } from "@apollo/client";

export default function Card(props) {
    const { card, index, image, price, isFav, style, classNames, handleClick, isDaily, isActive } = props;
    const [addFavorite] = useMutation(ADD_FAVORITE);
    const [removeFavorite] = useMutation(REMOVE_FAVORITE);

    // GraphQL mutations to add or remove a favorite
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

    // Render proper component depending on whether or not it is a favorite.
    const isFavorite = () => {
        // No buttons with text variant for header variant
        if (isDaily) {
            return (
                isFav ? (
                    <i className="fa fa-heart fa-2x"></i>
                    ) : ( 
                    <i className="far fa-heart fa-2x"></i>
                    )
            );
        } else {
            return ( 
                isFav ? (
                    <div>
                        <button 
                            className="absolute bottom-3 left-1/2 -translate-x-2/4 inset-x-0 rounded-md bg-red-500 p-2 text-xs font-bold w-6/12 hover:bg-red-900 hover:text-amber-50"
                            onClick={() => handleFavorite(card._id || card.itemId._id)}
                        >
                            <i className="fa fa-heart fa-1x"></i> Remove favorite
                        </button>    
                    </div> 
                    ) : (
                    <div>
                        <p className="text-amber-50 font-bold absolute bottom-14 inset-x-0">
                        ${ (card.itemId) ? card.itemId.cardmarket.prices.trendPrice.toFixed(2) : price}
                        </p>
                        <br />
                        <button 
                            className="absolute bottom-3 left-1/2 -translate-x-2/4 inset-x-0 rounded-md bg-red-500 p-2 text-xs font-bold w-6/12 hover:bg-red-900 hover:text-amber-50"
                            onClick={() => handleFavorite(card._id || card.itemId._id)}
                        >
                        <i className="far fa-heart fa-1x"></i> Add favorite
                        </button>
                    </div> 
                    ) 
                );
        }
    }
    
    return (
        isDaily ? ( 
                <div
                    key={index}
                    className={classNames}
                    htmlFor={`t-${index}`}
                    style={{ backgroundImage: `url(${card.images.small})` }}
                    onClick={(event) => handleClick("curr", index)}
                >
                { isActive && (
                    <button
                        className="favorites-btn btn btn-primary"
                        onClick={(event) => handleFavorite(card._id)}
                    >
                    {isFavorite()}
                    </button>
                )}
                </div>
        ) :
        ( <>
            <div key={index} className={classNames ? classNames : "bg-neutral-800 rounded-md relative h-128 inset-x-0"}>
                <div>
                    <img
                    src={ (card.itemId) ? card.itemId.images.small : image }
                    alt="card"
                    className="rounded-md mt-4 absolute left-1/2 -translate-x-2/4 top-0 h-3/4"
                    />
                </div>
                {isFavorite()}
            </div>
        </> 
        )
    );
}