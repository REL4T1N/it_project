import Button from "../components/buttons/Button"
import { Link } from "react-router-dom"
import styles from "../components/header/header.module.css";
import logopic from "../assets/pictures/logo1.png"
import { useContext, useState } from "react";
import { fetchUser, UserRegistration } from "../API/userAPI";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const Register = () => {
  const navigate = useNavigate();
  const [Form, setForm] = useState({
    'username' : '',
    'email' : '',
    'password' : ''
   })
  const {user, setUser} = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState();
  const HandleChange = (e) => {
    setForm(prev => ({
      ...prev,
    [e.target.name]: e.target.value
    }));
  };
  const SubmitForm =  async (e) =>{
    e.preventDefault();
    try{
      await UserRegistration(Form); // Прокидывать ошибка до сюда
      await fetchUser(setUser, setError);
      navigate('/choose_rec');
    }
    catch(error){
        setMessage(error.message);
    }
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col p-5 bg-[#1A1A1A] rounded-xl h-[600px] w-[600px] justify-between">
        <div className="flex items-center">
          <Link to="/"><img src={logopic} className={`${styles.logo} ml-8 mr-16`}></img></Link>
          <p className={`text-[#d1e349] text-center text-3xl font-[Montserrat] pt-2`}>Регистрация</p>
        </div>
          <form onSubmit={SubmitForm}>
            <label className="block mb-2 text-[#d1e349] font-[Montserrat] ml-10">Имя пользователя:</label>
            <input type="text" name="username" required  onChange={HandleChange} className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#d1e349]"></input>
            <label className="block mb-2 text-[#d1e349] font-[Montserrat] ml-10">Email:</label>
            <input type="email" name="email" required onChange={HandleChange} className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#d1e349]"></input>
            <label className="block mb-2 text-[#d1e349] font-[Montserrat] ml-10">Пароль:</label>
            <input type="password" name="password" required onChange={HandleChange} className="p-2 border mb-4 w-[90%] mx-6 rounded-xl bg-[#333333] border-[#98a116]"></input>
          <div className="flex w-[560px] px-10 py-[30px]">
            <Button title="Зарегистрироваться" type='submit'></Button>
          </div>
          </form>
        <p>{message}</p>
        <div className="flex flex-row items-center justify-center">
          <p className={`text-[#d1e349] text-center text-sm mr-1 font-[Montserrat]`}>Уже есть аккаунт?</p>
          <Link to="/login"><p className={`${styles.glow} text-center text-l underline`}>Вход</p></Link>
        </div>
      </div>
    </div>
  )
}
export default Register

