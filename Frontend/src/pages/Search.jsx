import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import FilmCard from "../components/film_cards/FilmCard";
import FilterPanel from "../components/FilterPanel";
import Header from "../components/header/Header";
import { GetRecomendationData, SendSearch } from "../API/UserAPI";
import ErrorPage from "../components/ErrorPage";


const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null)
  const [filters, setFilters] = useState({
  genres: [],
  years: [2000, 2024],
  ratings: [0, 10],
  durations: [80, 180],
  ages: [],
  countries: []
});
const params = [query, filters.years[0], filters.years[1], filters.ratings[0], filters.ratings[1], 
                        filters.durations[0], filters.durations[1], filters.ages, filters.genres, filters.countries]
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        console.log('sdfsdfds')
        await SendSearch(params, setResults)
        
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
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
            <div className="max-w-6xl mx-auto">
                {results?.length > 0 ? (
                    <div className="flex flex-wrap gap-8 justify-center">
                    {results?.map(film => (
                    <FilmCard
                        key={film.kp_id}
                        data={film}
                    />
                    ))}
                </div>
                ) : (
                    <div className="text-center text-gray-400 text-xl font-[Montserrat] mt-24">
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