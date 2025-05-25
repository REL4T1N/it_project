import React from 'react'
import FilmCard from '../film_cards/FilmCard'
import { Link } from 'react-router-dom'
import styles from "./cardScroller.module.css"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from 'react'
const CardScroller = (data) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -450 : 450,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className='relative'>
      <div className='relative my-20 mx-14 bg-[#2f2d2d] h-[320px]'>
        <button
                  onClick={() => scroll("left")}
                  className="absolute left-2 top-[50%] transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80">
                  <ChevronLeft className="text-white w-6 h-6" />
        </button>
        <div className={`h-full overflow-x-auto ${styles.scrollbar_hidden}`} ref={scrollRef}>
          <div className='flex flex-nowrap w-max'>
            <FilmCard name="" rate="7.5" movie_id='354'/>
            <FilmCard name="" rate="4.6" movie_id='329'/>
            <FilmCard name="" rate='7.7' movie_id='1162606'/>
            <FilmCard name="" rate='7.6' movie_id='1169265'/>
            <FilmCard name=""/>
            <FilmCard name=""/>
            <FilmCard name=""/>
            <FilmCard name=""/>
            <FilmCard name=""/>
            <FilmCard name=""/>
            <FilmCard name=""/>
            <FilmCard name=""/>
            <FilmCard name=""/>
          </div>
        </div>
        <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-[50%] transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80">
              <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default CardScroller