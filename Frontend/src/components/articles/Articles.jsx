import React from 'react'
import FilmCard from '../film_cards/FilmCard'
import styles from "./articles.module.css"
import { Link } from 'react-router-dom'
import CardScroller from '../cardScroller/CardScroller'
const Articles = () => {
  return (
    <div>
      <Link to="/articles"><h1 className={`mx-20 translate-y-[60px] text-3xl ${styles.glow} w-[240px]`}>Статьи {`>`} </h1></Link>
      <CardScroller/>
    </div>
  )
}

export default Articles