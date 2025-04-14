import React from 'react';
import styles from "./FilmCardStyles.module.css";
import logopic from "../../assets/pictures/logo1.png";
function truncateString(str){
  return str.length > 35 ? str.slice(0,35)+'...' : str;
}
const FilmCard = (props) => {
  return (
    <div className='overflow-hidden'>
      <div  className="mx-7 my-5 center border border-sky-50 w-[150px]  h-[240px]" id='FilmCard'>
          <div id='Image' className='max-w-[150px] max-h-[240px]'>
          <img src={logopic} alt="Логотип" className={styles.picture}/>
              <div id='rate' className={`align-top float-right px-2 ${props.rate < 5 ? "bg-red-500" : props.rate >= 7 ? "bg-green-500" : "bg-gray-500"}`}>
                  <p>{props.rate}</p>

              </div>
          </div>
          <p></p>
      </div>
      <p id='description' className={`translate-x-7 -translate-y-5  w-[160px] my-6`}>{truncateString(props.name)}</p>
    </div>
  )
}

export default FilmCard