import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { QUERY_ACCOUNT, QUERY_FAVORITES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import Card from './Card';

export default function Products(props) {
  const { setIsNavOpen } = props;
  const [cards, setCards] = useState([]);
  const favList  = useQuery(QUERY_ACCOUNT);
  // const { account } = { favorites.data };
  const { loading, error, data } = useQuery(QUERY_FAVORITES, {
    variables: { inventory: "pokecards" }
  });

  useEffect(() => {
    setIsNavOpen(false);
    document.documentElement.style.overflow = "auto"; // Enable scrolling
  }, []);

  if (loading) {
    return <Loading />;
  }

  console.log(data.favorites);
  const cardsData = data.favorites;

  return (
    <div className="relative w-screen bg-neutral-800 h-max border-x-8 border-y-8 border-neutral-900">
      <div className="products w-3/4 mx-auto h-auto">
        <h1 className="bg-neutral-900 pt-2 pb-4 rounded-md text-center text-amber-50 text-xl font-bold">
          My <span className="text-red-500">Favorite</span> Cards
        </h1>
        <h1 className="text-center text-amber-50 text-2xl m-5">
          私の<span className="text-red-500">好物</span>カード
        </h1>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center m-5">
          {cardsData.map((card, index) => {
            return <Card 
              card={card} 
              index={index} 
              image={card.images.small} 
              price={card.cardmarket.prices.trendPrice}
              isFav={true} 
            />
          })}
        </div>
      </div>
    </div>
  );
}
