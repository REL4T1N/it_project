import React, { useEffect, useState } from 'react'
import Header from "../components/header/Header"
import styles from "../styles/filmpage.module.css"
import { Link, useParams } from 'react-router-dom';
import image from "../assets/pictures/image.png"
import { BookmarkPlus, MoreHorizontal } from 'lucide-react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { MdStarRate } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { useRef } from 'react';
import { fetchUser, GetFilmData, GetReviewData } from '../API/UserAPI';
import Review  from '../components/review/Review'
const Actors = [
  'Леонардо Дикаприо', 'Бред Питт', '...'
];
const FilmPage = () => {
  const {user, setUser} = useContext(UserContext);
  const reviewScrollref = useRef(null);
  const ScrollToRewie = () => {
    reviewScrollref.current?.scrollIntoView({behavior: 'smooth'})
  }
  const { movie_id } = useParams();

  const [error, setError] = useState(null);
  const [filmData, setFilmData] = useState(null);
  const [reviewData, setReviewData] = useState(null);

  useEffect(()=>{
    GetFilmData(movie_id, setFilmData, setError);
    GetReviewData(movie_id, setReviewData, setError);
  },[])
  if (!filmData) {
  return <p>Loading…</p>;   // первый рендер
  }
  return (error ? <p>{error}</p> : filmData == null ? <p>Loading...</p> :
    <>
      <Header/>
      <div className='w-[1400px] bg-black place-self-center'>
        <img src={filmData.poster} className='float-right pt-24 px-14 w-[600px]'></img>
        <h1 className={`text-[#C6DE17] text-4xl pt-20 px-16 font-[Montserrat]`}>{filmData.name} ({filmData?.year})</h1>
        <p className='text-[#a3ae49] text-lg pt-7 px-14'>{filmData.description}</p>
        <div className='flex px-16 py-8' >
          <div className="flex space-x-6">
            <button className="bg-[#1c1c1e] p-3 rounded-full hover:bg-[#2c2c2e] transition">
                <BookmarkPlus className="text-[#C6D459] w-36 h-6" />
            </button>
            <button className="bg-[#1c1c1e] p-3 rounded-full hover:bg-[#2c2c2e] transition">
              <BookmarkPlus className="text-[#C6D459] w-6 h-6" />
            </button>
            <button className="bg-[#1c1c1e] p-3 rounded-full hover:bg-[#2c2c2e] transition" >
              <MoreHorizontal className="text-[#C6D459] w-6 h-6" />
            </button>
            <div>
              <div className='flex space-x-2'>
                <div id='rate' className={`w-16 h-10 pl-7 place-content-center rounded-lg translate-y-[6px] pr-14`}>
                  <p className={`${filmData?.rating < 5 ? "text-red-500" : filmData?.rating >= 7 ? "text-green-500" : "text-gray-500"} font-[Montserrat] font-semibold text-3xl`}>{filmData?.rating.toFixed(1)}</p>
                </div>
                  <p className='text-[#a3ae49] text-sm pt-2'>{filmData?.votes} голосов</p>
                  <button className='bg-[#1c1c1e] p-3 rounded-full hover:bg-[#2c2c2e] transition text-[#a3ae49] font-[Montserrat] hover:text-[#C6DE17] flex '><MdStarRate className='text-2xl pr-1'/>Оценить</button>
                  <button className='bg-[#1c1c1e] p-3 rounded-full hover:bg-[#2c2c2e] transition text-[#a3ae49] font-[Montserrat] hover:text-[#C6DE17] flex' onClick={ScrollToRewie}><MdRateReview className='text-2xl pr-1'/>Рецензии</button>
              </div>
            </div>
          </div>
        </div>
        <h2 className={`text-[#cfde5d] text-2xl px-16 pt-8 font-[Montserrat]`}>О фильме</h2>
        <div className='flex px-16'>
          <div className='grid grid-cols-2 py-7 gap-y-5 gap-x-10'>
                {[
                  { label: 'Год производства', value: filmData?.year },
                  { label: 'Страна', value: filmData?.countries?.map((country) => country.name).join(', ') },
                  { label: 'Жанр', value: filmData?.genres?.map((genre) => genre.name).join(', ')},
                  { label: 'Возрастное ограничение', value: `${filmData?.ageRating}+` },
                  { label: 'Хронометраж', value: `${filmData?.movieLength} минуты` },
                  { label: 'Бюджет', value: `${filmData?.budget?.value} ${filmData?.budget?.currency}` },
                  { label: 'Сборы в России', value: `${filmData.fees?.russia?.value} ${filmData.fees?.russia?.currency}` },
                  { label: 'Сборы в CША', value: `${filmData.fees?.usa?.value} ${filmData.fees?.usa?.currency}` },
                  { label: 'Сборы в мире', value: `${filmData.fees?.world?.value} ${filmData.fees?.world?.currency}` },
                  { label: 'Cтатус', value: filmData?.status}
                ]
                .filter(detail => !String(detail.value).includes('undefined') && !String(detail.value).includes('null'))
                .map(({ label, value }) => (
                  <React.Fragment key={label}>
                    <p className='text-[#9ba646] py'>{label}</p>
                    <p className=' text-[#C6D459]'>{value}</p>
                  </React.Fragment>
                ))}
          </div>
          <div className='-translate-y-7'>
            <h1 className='text-[#C6D459] pl-24  text-lg pb-3 font-[Montserrat]'> В главных ролях </h1>
            {Actors.map((actor) => (
              <React.Fragment key={actor}>
                <p className=' text-[#9ba646] pl-24 py-0.5'>{actor}</p>
              </React.Fragment>
            ))}
            <p className={`${styles.glow} pl-24`}>Всего 52 актера</p>
          </div>
        </div>
        <div ref={reviewScrollref} className='pb-8'>
          {console.log('reviews →', reviewData)}
          <Review reviews={reviewData}/>
        </div>
      </div> 
    </>
  )
}

export default FilmPage