import { useContext } from 'react'
import Header from "../components/header/Header"
import { useState, useEffect  } from "react";
import Button from '../components/button';
import { Link } from 'react-router-dom';
import { fetchUser } from '../API/userAPI';
import { UserContext } from '../context/UserContext';
const User = () => {
  const {user, setUser} = useContext(UserContext);
  const [error, setError]= useState(null);
  useEffect(() => {
    fetchUser(setUser, setError);
  },[])
  return (
    <>
    <Header/>
    <div className='py-[100px]'>
    <div className="h-[90%] flex px-[7%] items-start justify-center">
      <div>
        <div className="flex flex-col p-5 bg-[#1A1A1A] rounded-full h-[400px] w-[400px] justify-between mx-32 -translate-x-35 relative">
        </div>
        <div className="flex items-center justify-center mt-4">
          <p className={`text-[#f4ff54] text-center text-3xl font-[Montserrat]`}>{user.username}</p>
        </div>
        <div>
           {/* {user.id == cookies.id ? */ }
           <div className='flex items-start justify-center'>
              <Link to="/user/settings">
                <div className="flex w-[400px] px-10 py-[30px]">
                  <Button title="Редактировать профиль"></Button>
                </div>
              </Link>
            </div>
        </div>
        <div className='flex items-start justify-center'>
          <form method="post" action="/api/logout">
            <div className="flex w-[400px] px-10 py-[10px]">
              <Button title="Выйти"></Button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-[#1A1A1A] w-[900px] h-[600px] justify-beetwen py-[80px] px-[-20] rounded-xl">
        <div className="flex items-center">
          <p className={`text-[#f4ff54] text-center text-3xl font-[Montserrat] pt-2`}>Личный профиль</p>
        </div>
          <div className="flex flex-col items-start">
            <p className={`text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2`}>Имя: {user.username}</p>
            <p className={`text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2`}>Email: {user.email}</p>
            <p className={`text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2`}>О себе: {user.user_desctiption}</p>
          </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default User