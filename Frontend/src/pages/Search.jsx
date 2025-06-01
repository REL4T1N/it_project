import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import FilmCard from "../components/film_cards/FilmCard";
import FilterPanel from "../components/FilterPanel";
import Header from "../components/header/Header";
import { GetRecomendationData, SendSearch } from "../API/UserAPI";
import ErrorPage from "../components/ErrorPage";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
  genres: [],
  years: [1950, 2024],
  ratings: [0, 10],
  durations: [20, 240],
  ages: [],
  countries: []
});
const params = [query, filters.years[0], filters.years[1], filters.ratings[0], filters.ratings[1], 
                        filters.durations[0], filters.durations[1], filters.ages, filters.genres, filters.countries]
  const handleSubmit =async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
        console.log('sdfsdfds')
        await SendSearch(params, setResults)
        setIsLoading(false);
        
    } catch (error) {
        console.error("Ошибка при отправке формы:", error);
        setError(error);
        setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            await GetRecomendationData(setGenres);
        } catch (error) {
            setError(error);
        }
    }
    fetchData();
  },[]);
  if (error) {
    return <ErrorPage err_code={error.status}/>
  }
  if (isLoading) {
    return <LoadingPage />
  }
  return (
    <>
    <Header/>
    <div className="w-[1000px] bg-black place-self-center">
        <div className="min-h-screen pt-8 pb-10">
            <div className="max-w-4xl mx-auto mb-10">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 items-center bg-[#232323] rounded-2xl px-8 py-6 shadow-xl">
                <div className="flex items-center w-full md:w-2/3 bg-[#191919] rounded-xl px-4 py-2">
                    <Search className="text-[#DBF231] w-6 h-6 mr-2" />
                    <input
                    type="text"
                    placeholder="Поиск фильмов..."
                    className="bg-transparent outline-none w-full text-[#f4ff54] text-lg font-[Montserrat] placeholder-gray-400"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    />
                </div>
                {/* Кнопка показать/скрыть фильтры */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        type="button"
                        onClick={() => setShowFilters(prev => !prev)}
                        className={`
                        flex items-center gap-1
                        bg-[#DBF231] text-[#232323] px-4 py-2 rounded-xl font-[Montserrat] font-semibold shadow
                        hover:bg-[#f4ff54] transition
                        `}
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        {showFilters ? "Скрыть фильтры" : "Открыть фильтры"}
                    </button>
                    {/* Кнопка Найти (мобильный вид, если надо) */}
                    <button
                        type="submit"
                        className="md:hidden flex items-center gap-1 bg-[#DBF231] text-[#232323] px-4 py-2 rounded-xl font-[Montserrat] font-semibold shadow hover:bg-[#f4ff54] transition"
                    >
                        Найти
                    </button>
                </div>
                </form>

                <div
                className={`
                    overflow-hidden transition-all duration-500
                    ${showFilters ? "opacity-100 mt-6" : "max-h-0 opacity-0"}
                `}
                >
                
                    <FilterPanel filters={filters} setFilters={setFilters} genres={genres}/>
            </div>

            {/* Результаты поиска */}
            <div className="flex flex-col space-y-6 my-8">
        {results?.lenght !== 0 ? (results?.map((film) => (
          <Link to={`/movies/${film?.kp_id}`} key={film?.id}>
          <div
            key={film?.id}
            className="flex items-center bg-[#23251d] rounded-xl p-3 hover:scale-[1.010] transition shadow-lg"
          >
            <img
              src={film?.poster}
              alt={film?.name}
              className="h-32 object-cover rounded-xl border-[#C6D459] mr-4"
            />
            <div>
              <div className="flex items-center space-x-2">
                  <span className="text-[#C6DE17] text-lg font-semibold">
                    {film?.name}
                  </span>
                  <p className="text-[#a3ae49] text-sm">{film?.year}</p>
              </div>
            </div>
          </div>
          </Link>)
        )) : (
            <div className="text-center text-gray-400 text-xl font-[Montserrat] mt-12">
                    Ничего не найдено. Попробуйте изменить запрос или фильтры.
                </div>
          )}
          </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default SearchPage;
//