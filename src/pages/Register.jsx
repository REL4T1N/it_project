import React from 'react'
import Button from "../components/button"
import { Link } from "react-router-dom"
import styles from "../components/header/header.module.css";
import logopic from "../assets/pictures/logo1.png"
const Register = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col p-5 bg-[#1A1A1A] rounded-xl h-[600px] w-[600px] justify-between">
        <div className="flex items-center">
          <Link to="/"><img src={logopic} className={`${styles.logo} ml-8 mr-16`}></img></Link>
          <p className={`text-[#DBF231] text-center text-3xl font-[Montserrat] pt-2`}>Регистрация</p>
        </div>
        <form method="post" action="/login">
            <label class="block mb-2 text-[#DBF231] font-[Montserrat] ml-10">Имя пользователя:</label>
            <input type="text" name="username" required className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#DBF231]"></input>
            <label class="block mb-2 text-[#DBF231] font-[Montserrat] ml-10">Email:</label>
            <input type="email" name="email" required className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#DBF231]"></input>
            <label class="block mb-2 text-[#DBF231] font-[Montserrat] ml-10">Пароль:</label>
            <input type="password" name="password" required className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116]"></input>
          <div className="flex w-[560px] px-10 py-[30px]">
            <Button title="Зарегистрироваться"></Button>
          </div>
        </form>
        <div className="flex flex-row items-center justify-center">
          <p className={`text-[#DBF231] text-center text-sm mr-1 font-[Montserrat]`}>Уже есть аккаунт?</p>
          <Link to="/login"><p className={`${styles.glow} text-center text-l underline`}>Вход</p></Link>
        </div>
      </div>
    </div>
  )
}

export default Register