import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { QUERY_ACCOUNT, QUERY_INVENTORY } from "../utils/queries";
import { useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import Card from './Card';

export default function Products(props) {
  // const { data } = props;
  const [cards, setCards] = useState([]);
  const favList  = useQuery(QUERY_ACCOUNT);
  // const { account } = { favorites.data };
  const { loading, error, data } = useQuery(QUERY_INVENTORY, {
    variables: { inventory: "pokecards" }
  });

  if (loading) {
    return <Loading />;
  }

  // if ( AuthService.loggedIn ) {
  //   console.log("User is logged in");
  //   console.log(favList.data);
  //   const { favorites } = favList.data.account;
  //   console.log(favorites);
  // }

  // Getting all cards that have a price greater than $30
  const filteredCards = data.getInventory[0].cards.filter(
    (card) => card.itemId.cardmarket.prices.trendPrice > 30
  );

  // Slicing filteredCards to only show the first 15 cards enough for 5 rows while fullscreen
  const cardsData = filteredCards.slice(0, 15);

  return (
    <div className="pt-4 relative w-1/1 bg-neutral-800 h-max border-x-8 border-y-8 border-neutral-900">
      <div className="products w-3/4 mx-auto h-auto">
        <h1 className="bg-neutral-900 pt-2 pb-4 rounded-md text-center text-amber-50 text-xl font-bold">
        █████ <span className="text-red-500">Catch</span> ███ ████ | ポケモンゲットだぜ! 
        </h1>
        <br />
        <div className="pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center m-5">
          {cardsData.map((card, index) => {
            return <Card props={props} card={card} index={index} />
          })}
        </div>
      </div>
    </div>
  );
}
