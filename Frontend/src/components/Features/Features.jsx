import React from 'react'
import styles from "./features.module.css"
import { Link } from 'react-router-dom'
import CardScroller from '../cardScroller/CardScroller';
import "./features.module.css"
const Features = () => {
  return (
    <>
      <Link to="/features"><h1 className={`mx-20 translate-y-[60px] text-3xl ${styles.glow} w-[240px] font-[montserrat]`}>Уже в кино {`>`} </h1></Link>
      <CardScroller/>
    </>
  )
}

export default Features