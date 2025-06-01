import React from "react";
import styles from "./FilmCardStyles.module.css";
import logopic from "../../assets/pictures/logo1.png";
import { Link } from "react-router-dom";
function truncateString(str) {
  return str.length > 35 ? str.slice(0, 35) + "..." : str;
}
const FilmCard = (data) => {
  return (
    <Link to={`/movies/${data?.id}`}>
      <div className="overflow-hidden">
        <div id="FilmCard">
          <div id="Image" className="max-w-[160px] max-h-[240px]  relative">
            <img src={data?.poster} alt="Логотип" className="rounded-lg" />
            {data?.rating != 0 && (
              <div
                id="rate"
                className={`absolute top-2 right-2 px-2 rounded-lg ${
                  data?.rating < 5
                    ? "bg-red-500"
                    : data?.rating >= 7
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                <p className="bold text-white font-[Montserrat]">
                  {data?.rating}
                </p>
              </div>
            )}
          </div>
          <p></p>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;
