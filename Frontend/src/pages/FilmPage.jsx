import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import styles from "../styles/filmpage.module.css";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { MdRateReview } from "react-icons/md";
import { useRef } from "react";
import {
  GetTable,
  GetFilmData,
  GetReviewData,
  MakeTable,
} from "../API/UserAPI";
import Review from "../components/review/Review";
import UnauthorizedPage from "../components/UnathorizedPage";
import ErrorPage from "../components/ErrorPage";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import FavouriteButton from "../components/buttons/FavouriteButton";
import PopoverMenu from "../components/PopoverMenu";
import LoadingPage from "./LoadingPage";
import { Eye } from "lucide-react";
import EyePopupButton from "../components/buttons/EyePopupButton";
const FilmPage = () => {
  const { user, setUser } = useContext(UserContext);
  const reviewScrollref = useRef(null);
  const ScrollToRewie = () => {
    reviewScrollref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { movie_id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [filmData, setFilmData] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [rating, setRating] = useState(null);
  const [favourite, setIsFavourite] = useState(null);
  const [watched, setIsWatched] = useState(null);
  const [watchList, setIsWatchList] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        Promise.all([
          GetFilmData(movie_id, setFilmData),
          GetReviewData(movie_id, setReviewData),
          GetTable(movie_id, setIsFavourite, "favorite_movies"),
          GetTable(movie_id, setIsWatched, "watched_movies"),
          GetTable(movie_id, setIsWatchList, "watch_list_movies")]);
      } catch (e) {
        setError(e);
      }
    }
    fetchData();
  }, []);
  if (!filmData) {
    return (
      <LoadingPage/>
    );
  }
  if (user === null) return <UnauthorizedPage />;
  if (error) {
    return <ErrorPage err_code={e.status}/>;
  }
  return (
    <>
      <Header />
      <div className="w-[1400px] bg-black place-self-center">
        <img
          src={filmData.poster}
          className="float-right pt-24 px-14 w-[600px]"
        ></img>
        <h1 className={`text-[#C6DE17] text-4xl pt-20 px-16 font-[Montserrat]`}>
          {filmData.name} ({filmData?.year})
        </h1>
        <p className="text-[#a3ae49] text-lg pt-7 px-14">
          {filmData.description}
        </p>
        <div className="flex px-16">
          <div className="flex space-x-6 py-10">
            <FavouriteButton
              movie_id={movie_id}
              favourite={favourite}
              setIsFavourite={setIsFavourite}
              setError={setError}
            />
            <EyePopupButton
              text={filmData?.description}
              setOpen={setPopupOpen}
              open={popupOpen}
            />
            <PopoverMenu
              isWatched={watched}
              setIsWatched={setIsWatched}
              watchList={watchList}
              setIsWatchList={setIsWatchList}
              movie_id={movie_id}
            />
            <div>
              <div className="flex space-x-6 pl-40">
                <div
                  id="rate"
                  className={`w-16 h-10 pl-7 place-content-center rounded-lg translate-y-[6px] pr-14`}
                >
                  <p
                    className={`${filmData?.rating < 5 ? "text-red-500" : filmData?.rating >= 7 ? "text-green-500" : "text-gray-500"} font-[Montserrat] font-semibold text-3xl`}
                  >
                    {filmData?.rating.toFixed(1)}
                  </p>
                </div>
                <p className="text-[#a3ae49] text-sm font-bold pt-2 -translate-y-[3px]">
                  {filmData?.votes} голосов
                </p>
                <button
                  className="bg-[#1c1c1e] p-3 rounded-full hover:bg-[#2c2c2e] transition text-[#a3ae49] font-[Montserrat] hover:text-[#C6DE17] flex"
                  onClick={ScrollToRewie}
                >
                  <MdRateReview className="text-2xl pr-1" />
                  Рецензии
                </button>
              </div>
            </div>
          </div>
        </div>
        {popupOpen && (
        <div className="w-full px-14">
          <div className="bg-[#232323] text-[#DBF231] rounded-2xl px-10 py-8 shadow-xl text-sm font-[Montserrat] text-center z-20 max-w-[700px] w-full my-2 transition-all duration-300">
            {filmData?.shortDescription}
          </div>
        </div>
      )}
        <h2 className={`text-[#cfde5d] text-2xl px-16 pt-4 font-[Montserrat]`}>
          О фильме
        </h2>
        <div className="flex px-16">
          <div className="grid grid-cols-2 py-7 gap-y-5 gap-x-10">
            {[
              { label: "Год производства", value: filmData?.year },
              {
                label: "Страна",
                value: filmData?.countries
                  ?.map((country) => country.name)
                  .join(", "),
              },
              {
                label: "Жанр",
                value: filmData?.genres?.map((genre) => genre.name).join(", "),
              },
              {
                label: "Возрастное ограничение",
                value: `${filmData?.ageRating}+`,
              },
              {
                label: "Хронометраж",
                value: `${filmData?.movieLength} минуты`,
              },
              {
                label: "Бюджет",
                value: `${filmData?.budget?.value} ${filmData?.budget?.currency}`,
              },
              {
                label: "Сборы в России",
                value: `${filmData.fees?.russia?.value} ${filmData.fees?.russia?.currency}`,
              },
              {
                label: "Сборы в CША",
                value: `${filmData.fees?.usa?.value} ${filmData.fees?.usa?.currency}`,
              },
              {
                label: "Сборы в мире",
                value: `${filmData.fees?.world?.value} ${filmData.fees?.world?.currency}`,
              },
              { label: "Cтатус", value: filmData?.status },
            ]
              .filter(
                (detail) =>
                  !String(detail.value).includes("undefined") &&
                  !String(detail.value).includes("null"),
              )
              .map(({ label, value }) => (
                <React.Fragment key={label}>
                  <p className="text-[#9ba646]">{label}</p>
                  <p className=" text-[#C6D459]">{value}</p>
                </React.Fragment>
              ))}
          </div>
          <div className="-translate-y-7 pl-12">
            <h1 className="text-[#C6D459]  text-lg pb-3 font-[Montserrat]">
              {" "}
              В главных ролях{" "}
            </h1>
            {filmData?.persons.slice(0, 8).map((actor) => (
              <React.Fragment key={actor.id}>
                <p className=" text-[#9ba646]  py-1">{actor.name}</p>
              </React.Fragment>
            ))}
            <Link to={`cast`} className={`${styles.glow} `}>
              Всего {filmData?.persons.length}
            </Link>
          </div>
        </div>
        <div ref={reviewScrollref} className="pb-8">
          <Review reviews={reviewData} />
        </div>
      </div>
    </>
  );
};

export default FilmPage;
