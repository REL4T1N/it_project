import React, { useContext } from "react";
import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import Button from "../components/buttons/Button";
import Features from "../components/Features/Features";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ChangeUserInfo } from "../API/UserAPI";
const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  return (
    <>
      <Header user={user} />
      <div className="h-[90%] flex px-[7%] items-start justify-center py-[100px]">
        <div>
          <div className="flex flex-col p-5 bg-[#1A1A1A] rounded-full h-[400px] w-[400px] justify-between mx-32 -translate-x-35">
            <div className="flex items-center"></div>
          </div>
          <div>
            {/* {user.id == cookies.id ? */}
            <div className="flex items-start justify-center">
              <Link to="/user/settings">
                <div className="flex w-[400px] px-10 py-[30px]">
                  <Button title="Редактировать профиль"></Button>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-start justify-center">
            <form method="post" action="/api/logout">
              <div className="flex w-[400px] px-10 py-[10px]">
                <Button title="Выйти"></Button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col p-5 bg-[#1A1A1A] w-[900px] h-[600px] justify-beetwen py-[80px] px-[-20]">
          <div className="flex items-center">
            <p
              className={`text-[#f4ff54] text-center text-3xl font-[Montserrat] pt-2`}
            >
              Личный профиль
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p
              className={`text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2`}
            >
              Имя: бебра
            </p>
            <p
              className={`text-[#f4ff54] text-center text-2xl font-[Montserrat] pt-2`}
            >
              Email: бебра.com
            </p>
          </div>
        </div>
      </div>
      <Features />
    </>
  );
};

export default Settings;
