import React, { useState } from 'react';
import Button from '../components/button';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../components/header/header.module.css';
import logopic from '../assets/pictures/logo1.png';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Добавляем хук для навигации

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем стандартную отправку формы
    const userData = { username, email, password };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Для отправки и получения куки
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);
        console.log('Регистрация прошла успешно');
        navigate('/'); // Перенаправляем на стартовую страницу
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Ошибка регистрации');
        setSuccess(false);
      }
    } catch (err) {
      setError('Ошибка сети');
      setSuccess(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col p-5 bg-[#1A1A1A] rounded-xl h-[600px] w-[600px] justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src={logopic} className={`${styles.logo} ml-8 mr-16`} alt="Logo" />
          </Link>
          <p className="text-[#DBF231] text-center text-3xl font-[Montserrat] pt-2">Регистрация</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-[#DBF231] font-[Montserrat] ml-10">Имя пользователя:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#DBF231]"
          />
          <label className="block mb-2 text-[#DBF231] font-[Montserrat] ml-10">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#DBF231]"
          />
          <label className="block mb-2 text-[#DBF231] font-[Montserrat] ml-10">Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116]"
          />
          <div className="flex w-[560px] px-10 py-[30px]">
            <Button title="Зарегистрироваться" />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">Регистрация успешна!</p>}
        </form>
        <div className="flex flex-row items-center justify-center">
          <p className="text-[#DBF231] text-center text-sm mr-1 font-[Montserrat]">Уже есть аккаунт?</p>
          <Link to="/login">
            <p className={`${styles.glow} text-center text-l underline`}>Вход</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;