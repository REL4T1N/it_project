import FilmCard from "../film_cards/FilmCard";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Scroll } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/filmpage.module.css";
const CardScroller = ({ data, text }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -846 : 846,
        behavior: "smooth",
      });
    }
  };
  useEffect(() =>{
    const HandleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 1);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }
    const el = scrollRef.current;
    if (el){
      HandleScroll();
      el.addEventListener('scroll', HandleScroll)
      window.addEventListener('resize', HandleScroll)
    }
    return () => {
      if (el){
        el.removeEventListener('scroll', HandleScroll)
        window.removeEventListener('resize', HandleScroll)
      }
    }
  },[data])
  return (
    <div className="relative">
      <div className="relative bg-[#2f2d2d] h-[310px] max-w-[1400px] mx-auto rounded-2xl my-20 ">
        <h1
                  className={`text-2xl ${styles.glow} font-[montserrat]  -translate-y-10 px-10 overflow-y-hidden`}
                >
                 {text}
                </h1>
        {canScrollLeft && <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-[50%] transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>}
        <div
          className={`h-full overflow-x-auto ${styles.scrollbarhidden}`}
          ref={scrollRef}
        >
          <div className="flex flex-nowrap w-max px-7">
            {data?.filter(film => film?.poster).map((film) => (
              <Link
                to={`/movie/${film?.kp_id}`}
                key={film?.kp_id}
                className="flex-shrink-0 w-[200px]"
              >
                <FilmCard
                  title={film?.name}
                  poster={film?.poster}
                  rating={film?.rating?.toFixed(1)}
                  id={film?.kp_id}
                />
              </Link>
            ))}
          </div>
        </div>
        {canScrollRight && <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-[50%] transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>}
      </div>
    </div>
  );
};

export default CardScroller;
