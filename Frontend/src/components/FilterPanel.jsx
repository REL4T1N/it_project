import React, { useState, useEffect } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';



const AGES = [
  "0", "6", "12", "16", "18"
];

const YEARS = [1950, new Date().getFullYear()];
const RATINGS = [0, 10];
const DURATIONS = [20, 240];
const FilterPanel = ({ filters, setFilters, genres = []}) => {
  // локальные состояния для кастомных отображений (можно управлять и через props)
  const [selectedGenres, setSelectedGenres] = useState(filters.genres || []);
  const [yearRange, setYearRange] = useState(filters.years || YEARS);
  const [ratingRange, setRatingRange] = useState(filters.ratings || RATINGS);
  const [durationRange, setDurationRange] = useState(filters.durations || DURATIONS);
  const [selectedAges, setSelectedAges] = useState(filters.ages || []);

  // Обновление значений
  useEffect(() => {
    setFilters({
      genres: selectedGenres,
      years: yearRange,
      ratings: ratingRange,
      durations: durationRange,
      ages: selectedAges,
    });
    console.log(filters);
  }, [selectedGenres, yearRange, ratingRange, durationRange, selectedAges]);

  // Для красивых жанров — кнопки с выделением
  function toggleGenre(genre) {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  }


  function toggleAge(age) {
    setSelectedAges(prev =>
      prev.includes(age)
        ? prev.filter(a => a !== age)
        : [...prev, age]
    );
  }

  return (
    <div className="bg-[#232323] rounded-2xl p-8 shadow-lg max-w-2xl mx-auto text-[#f4ff54] font-[Montserrat]">
      <h2 className="text-2xl mb-6 text-[#DBF231] font-bold">Фильтры</h2>
      
      <div className="mb-6">
        <label className="block mb-2 text-[#C6DE17] font-semibold">Год выпуска:</label>
        <Slider range
          min={YEARS[0]}
          max={YEARS[1]}
          value={yearRange}
          onChange={setYearRange}
          allowCross={false}
          trackStyle={[{ backgroundColor: "#DBF231" }]}
          handleStyle={[
            { borderColor: "#DBF231", backgroundColor: "#232323" },
            { borderColor: "#DBF231", backgroundColor: "#232323" }
          ]}
          railStyle={{ backgroundColor: "#444" }}
        />
        <div className="flex justify-between text-sm mt-2 text-gray-300">
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block mb-2 text-[#C6DE17] font-semibold">Рейтинг:</label>
        <Slider range
          min={RATINGS[0]}
          max={RATINGS[1]}
          step={0.1}
          value={ratingRange}
          onChange={setRatingRange}
          allowCross={false}
          trackStyle={[{ backgroundColor: "#DBF231" }]}
          handleStyle={[
            { borderColor: "#DBF232", backgroundColor: "#232323" },
            { borderColor: "#DBF231", backgroundColor: "#232323" }
          ]}
          railStyle={{ backgroundColor: "#444" }}
          
        />
        <div className="flex justify-between text-sm mt-2 text-gray-300">
          <span>{ratingRange[0].toFixed(1)}</span>
          <span>{ratingRange[1].toFixed(1)}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-[#C6DE17] font-semibold">Хронометраж (минуты):</label>
        <Slider range
          min={DURATIONS[0]}
          max={DURATIONS[1]}
          step={5}
          value={durationRange}
          onChange={setDurationRange}
          allowCross={false}
          trackStyle={[{ backgroundColor: "#DBF231" }]}
          handleStyle={[
            { borderColor: "#DBF231", backgroundColor: "#232323" },
            { borderColor: "#DBF231", backgroundColor: "#232323" }
          ]}
          railStyle={{ backgroundColor: "#444" }}
        />
        <div className="flex justify-between text-sm mt-2 text-gray-300">
          <span>{durationRange[0]} мин</span>
          <span>{durationRange[1]} мин</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-[#C6DE17] font-semibold">Возрастной рейтинг:</label>
        <div className="flex gap-2 flex-wrap">
          {AGES.map(age => (
            <button
              key={age}
              className={`px-3 py-1 rounded-full border-2 transition 
                ${selectedAges.includes(age)
                  ? "bg-[#DBF231] text-[#232323] border-[#DBF231]"
                  : "bg-[#232323] text-[#f4ff54] border-[#555] hover:border-[#DBF231]"}`
              }
              onClick={() => toggleAge(age)}
              type="button"
            >
              {age}+
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-2 text-[#C6DE17] font-semibold">Жанры:</label>
        <div className="flex gap-2 flex-wrap">
          {Array.isArray(genres) && genres?.map(genre => (
            <button
              key={genre}
              className={`px-4 py-1 rounded-2xl text-sm font-semibold border-2 transition
                ${selectedGenres.includes(genre)
                  ? "bg-[#DBF231] text-[#232323] border-[#DBF231]"
                  : "bg-[#232323] text-[#f4ff54] border-[#555] hover:border-[#DBF231]"}`
              }
              onClick={() => toggleGenre(genre)}
              type="button"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FilterPanel;