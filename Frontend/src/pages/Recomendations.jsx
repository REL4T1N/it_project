import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetRecomendationData, SendRecomendationData } from "../API/userAPI";

const RecommendationsPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [genreData, setGenreData] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();
  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedGenres.length >= 3 && selectedGenres.length <= 10) {
        await SendRecomendationData(selectedGenres, user.id);
        navigate("/");
      } else {
        setMessage("Выберите от 3 до 10 жанров");
      }
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        await GetRecomendationData(setGenreData);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center pt-7">
      <div className="w-[740px] bg-[#161616] rounded-3xl shadow-2xl border border-[#2c2c2e] p-10 flex flex-col items-center">
        <h2 className="text-[#C6DE17] text-3xl font-bold mb-7 text-center">
          Выбери любимые жанры
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="grid grid-cols-3 gap-4 w-full mb-8">
            {genreData?.map((genre) => (
              <button
                type="button"
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`py-3 px-5 rounded-xl font-semibold flex items-center justify-center transition shadow
                  ${
                    selectedGenres.includes(genre)
                      ? "bg-[#C6D459] text-[#23251d] scale-105"
                      : "bg-[#23251d] text-[#C6D459] hover:bg-[#2c2c2e] hover:text-[#C6DE17]"
                  }
                `}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#C6DE17] text-[#23251d] font-bold text-lg transition hover:bg-[#a3ae49] shadow-lg"
          >
            Готово!
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-4 text-center">={error}</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;
