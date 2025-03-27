import React from 'react'
import FilmCard from '../film_cards/FilmCard'
import styles from "./features.module.css"
import { Link } from 'react-router-dom'
const Features = () => {
  return (
    <div>
      <Link to="/features"><h1 className={`mx-20 translate-y-[60px] text-3xl ${styles.glow} w-[240px]`}>Уже в кино {`>`} </h1></Link>
      <div className='my-20 mx-14 pr-10 bg-[#807878] h-[320px] flex' id='container'>
          <FilmCard name="Я ебал твою мамашу да да уверен а пис" rate="7.5"/>
          <FilmCard name="гей" image="../../assets/pictues/search.png"/>
          <FilmCard name="гей"/>
          <FilmCard name="гей"/>
          <FilmCard name="гей"/>
          <FilmCard name="гей"/>
          <FilmCard name="гей"/>
      </div>
    </div>
  )
}

export default Features