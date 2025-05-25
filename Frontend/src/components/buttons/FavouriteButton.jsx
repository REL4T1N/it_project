import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MakeTable } from "../../API/userAPI";


const FavouriteButton = ({ movie_id, favourite, setIsFavourite, setError }) => (
  <button
    onClick={async () => {
      try {
        if (favourite) {
          await MakeTable(movie_id, "favorite_movies", true); 
        } else {
          await MakeTable(movie_id, "favorite_movies", false);
        }
        setIsFavourite(!favourite);
      } catch (e) {
        setError(e);
      }
    }}
    className="bg-[#1c1c1e] p-3 rounded-full hover:bg-[#2c2c2e] transition"
  >
    {favourite ? (
      <FaHeart className="text-[#C6D459] w-6 h-5" />
    ) : (
      <FaRegHeart className="text-[#C6D459] w-6 h-5" />
    )}
  </button>
);
export default FavouriteButton;