import React, { useRef, useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { FaEye, FaCheck } from "react-icons/fa";
import { MakeTable } from "../API/UserAPI";

const PopoverMenu = ({
  isWatched,
  setIsWatched,
  watchList,
  setIsWatchList,
  setError,
  movie_id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        onClick={() => setIsOpen((open) => !open)}
        className="bg-[#1c1c1e] p-3 rounded-full hover:bg-[#2c2c2e] transition"
      >
        <MoreHorizontal className="text-[#C6D459] w-6 h-6" />
      </button>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute -top-7 left-full ml-4 z-50 w-52 bg-[#111112] p-4 rounded-2xl shadow-2xl flex flex-col space-y-3 border border-[#2c2c2e] animate-fade-in"
        >
          {/* Кнопка "Буду смотреть" */}
          <button
            className={`w-full py-3 rounded-xl flex items-center space-x-3 px-4 font-semibold transition
            ${
              watchList
                ? "bg-[#C6D459] text-[#23251d]"
                : "bg-[#1c1c1e] text-[#C6D459] hover:bg-[#2c2c2e] hover:text-[#C6DE17]"
            }`}
            onClick={() => {
              try {
                if (watchList) {
                  MakeTable(movie_id, "watch_list_movies", true);
                } else {
                  MakeTable(movie_id, "watch_list_movies", false);
                }
                setIsWatchList((v) => !v);
              } catch (e) {
                setError(e);
              }
            }}
          >
            <FaEye
              className={`w-5 h-5 transition ${watchList ? "text-[#23251d]" : "text-[#C6D459]"}`}
            />
            <span>Буду смотреть</span>
          </button>
          {/* Кнопка "Просмотрено" */}
          <button
            className={`w-full py-3 rounded-xl flex items-center space-x-3 px-4 font-semibold transition
            ${
              isWatched
                ? "bg-[#C6D459] text-[#23251d]"
                : "bg-[#1c1c1e] text-[#C6D459] hover:bg-[#2c2c2e] hover:text-[#C6DE17]"
            }`}
            onClick={() => {
              try {
                if (isWatched) {
                  MakeTable(movie_id, "watched_movies", true);
                } else {
                  MakeTable(movie_id, "watched_movies", false);
                }
                setIsWatched((v) => !v);
              } catch (e) {
                setError(e);
              }
            }}
          >
            <FaCheck
              className={`w-5 h-5 transition ${isWatched ? "text-[#23251d]" : "text-[#C6D459]"}`}
            />
            <span>Просмотрено</span>
          </button>
        </div>
      )}
      <style>
        {`
        @keyframes fade-in { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: none;}}
        .animate-fade-in { animation: fade-in 0.25s cubic-bezier(.32,2,.55,.27);}
        `}
      </style>
    </div>
  );
};

export default PopoverMenu;
