import React from 'react'
import { FaGithub } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import footer_style from "./footer.module.css"
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='bg-black h-[110px] flex items-center justify-end'>
        <div>
            
        </div>
        <div className='items-center flex'>
            <div className={`${footer_style.glow} text-3xl justify-center `} id="Contacts">
                <Link to="https://github.com/REL4T1N/it_project"><FaGithub/></Link>
            </div>
            <div className={`${footer_style.glow} text-3xl justify-center px-5`} id="Contacts">
                <Link to="https://www.google.com/"><FaTelegram/></Link>
            </div>
        </div>
            
    </div>
  )
}

export default Footer