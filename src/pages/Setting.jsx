import React from 'react'
import Header from "../components/header/Header"
import { useState, useEffect  } from "react";
import Button from '../components/button';
import Features from '../components/Features/Features';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    image: null
  });

  async function GetUser(){
    const res = await fetch(`/api/users/${user.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      setFormData({
        username: data.username || '',
        email: data.email || '',
        password: '',
        image: data.image || null
      });
    } 
  }

  async function handleDeleteUser(){
    if (!user) return;
    
    const res = await fetch(`/api/users/${user.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    if (res.ok) {
      window.location.href = "/";
    } 
  }

  async function handleUpdateUser(e) {
    e.preventDefault();
    if (!user) return;

    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      alert("Профиль успешно обновлен");
      GetUser();
    } 
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    if (res.ok) {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <>
    <Header user={user}/>
    <div className="h-[90%] flex px-[7%] items-start justify-center py-[100px]">
      <div>
        <div className="flex flex-col p-5 bg-[#1A1A1A] rounded-full h-[400px] w-[400px] justify-between mx-32 -translate-x-35">
          <div className="flex items-center"></div>
        </div>
        <div>
           <div className='flex items-start justify-center'>
              <Link to="/user/settings">
                <div className="flex w-[400px] px-10 py-[30px]">
                  <Button title="Редактировать профиль"></Button>
                </div>
              </Link>
            </div>
        </div>
        <div className='flex items-start justify-center'>
          <div className="flex w-[400px] px-10 py-[10px]">
            <Button title="Выйти" onClick={handleLogout}></Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-[#1A1A1A] w-[900px] h-[600px] justify-beetwen py-[80px] px-[-20]">
        <div className="flex items-center">
          <p className={`text-[#f4ff54] text-center text-3xl font-[Montserrat] pt-2`}>Личный профиль</p>
        </div>
        <form onSubmit={handleUpdateUser} className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="Имя"
              className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#DBF231]"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email"
              className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#DBF231]"
            />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Новый пароль"
              className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#DBF231]"
            />
            <div className="flex w-[400px] px-10 py-[30px]">
              <Button title="Сохранить изменения" type="submit"></Button>
            </div>
            <div className="flex w-[400px] px-10 py-[10px]">
              <Button title="Удалить аккаунт" onClick={handleDeleteUser}></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <Features/>
    </>
  )
}

export default Settings