import styles from "./header.module.css";
import lkpic from "../../assets/pictures/lk.png";
import logopic from "../../assets/pictures/logo1.png";
import { Link } from "react-router-dom";
import Button from "../buttons/Button";
import { useContext } from "react";
import { Search } from "lucide-react";
import { UserContext } from "../../context/UserContext";
function Header() {
  const { user, setUser } = useContext(UserContext);
  return (
    <header className={styles.header}>
      <div className="l:w-[92%] h-full mx-auto my-0 block clear-fix">
        <div className="float-left table h-full px-[1%]">
          <Link to="/">
            <img src={logopic} className={styles.logo}></img>
          </Link>
        </div>
        <div className="l:text-2xl m:text-lg s:text-lg  table h-full float-right">
          <div className="l:px-10 m:px-7 s:px-3 align-middle table-cell">
            <h1 className={styles.glow}>
              <Link to='/search'><div className="float-left px-2 translate-y-1"><Search/></div> Искать</Link>
            </h1>
          </div>
          <div className="flex justify-center items-center h-full">
            {user ? (
              <div className="l:px-0 m:px-5 s:px-3">
                <Link to={`/user/${user.id}`}>
                  <img
                    src={lkpic}
                    className={`${styles.lcab} translate-x-5 -translate-y-2`}
                  ></img>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button title="Войти">
                    <p className={`${styles.glow} l:text-m px-2 s:text-sm`}>
                      Войти
                    </p>
                  </Button>
                </Link>
                <div>/</div>
                <Link to="/register">
                  <Button title="Регистрация">
                    <p className={`${styles.glow} l:text-m px-2 s:text-sm`}>
                      Регистрация
                    </p>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
