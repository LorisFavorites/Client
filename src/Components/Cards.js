import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { QUERY_ACCOUNT, QUERY_FAVORITES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import Card from './Card';

export default function Products(props) {
  // const { data } = props;
  const [cards, setCards] = useState([]);
  const favList  = useQuery(QUERY_ACCOUNT);
  // const { account } = { favorites.data };
  const { loading, error, data } = useQuery(QUERY_FAVORITES, {
    variables: { inventory: "pokecards" }
  });

  if (loading) {
    return <Loading />;
  }

  console.log(data.favorites);
  const cardsData = data.favorites;

  return (
    <div className="relative w-screen bg-white border-2 h-screen">
      <div className="products w-3/4 mx-auto h-auto">
        <h1 className="text-center text-3xl font-bold m-5 underline">
          My Favorites
        </h1>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center m-5">
          {cardsData.map((card, index) => {
            return <Card card={card} index={index} image={card.images.small} price={card.cardmarket.prices.trendPrice} />
          })}
        </div>
      </div>
    </div>
  );
}
