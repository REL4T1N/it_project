import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetFilmData } from "../API/userAPI";
import Header from "../components/header/Header";
import ActorCarousel from "../components/ActorCarousel";
const Actors = () => {
  const [filmData, setFilmData] = useState(null);
  const [error, setError] = useState(null);
  const { movie_id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        await GetFilmData(movie_id, setFilmData);
      } catch (e) {
        setError(e);
      }
    }
    fetchData();
  }, []);
  if (!filmData) {
    return (
      <div className="text-center text-xl py-12 text-gray-400">Загрузка...</div>
    );
  }
  return (
    <>
      <Header />
      <div className="w-[1400px] bg-black place-self-center">
        <ActorCarousel data={filmData?.persons} />
      </div>
    </>
  );
};

export default Actors;
