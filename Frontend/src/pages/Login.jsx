import Button from "../components/buttons/Button";
import { Link } from "react-router-dom";
import styles from "../components/header/header.module.css";
import logopic from "../assets/pictures/logo1.png";
import { useContext, useState } from "react";
import { fetchUser, UserLogin } from "../API/userAPI";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const login = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const HandlerChange = (e) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const SubmitForm = async (e) => {
    e.preventDefault();
    try {
      await UserLogin(loginForm);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col p-5 bg-[#1A1A1A] rounded-xl h-[500px] w-[600px] justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src={logopic} className={`${styles.logo} ml-8 mr-16`}></img>
          </Link>
          <p
            className={`text-[#d1e349] text-center text-3xl font-[Montserrat] pt-2`}
          >
            Авторизация
          </p>
        </div>
        <form onSubmit={SubmitForm}>
          <label class="block mb-2 text-[#d1e349] font-[Montserrat] ml-10">
            Email:
          </label>
          <input
            type="email"
            name="email"
            required
            onChange={HandlerChange}
            className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#d1e349]"
          ></input>
          <label class="block mb-2 text-[#d1e349] font-[Montserrat] ml-10">
            Пароль:
          </label>
          <input
            type="password"
            name="password"
            required
            onChange={HandlerChange}
            className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116]"
          ></input>
          <div className="flex w-[560px] px-10 pt-[20px] pb-0">
            <Button title="Войти" type="submit"></Button>
          </div>
        </form>
        <p className="text-center text-[#d1e349]">{error}</p>
        <div className="flex flex-row items-center justify-center">
          <p
            className={`text-[#d1e349] text-center text-sm mr-1 font-[Montserrat]`}
          >
            У вас еще нет аккаунта?
          </p>
          <Link to="/register">
            <p className={`${styles.glow} text-center text-l underline`}>
              Зарегистрируйтесь!
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
