import styles from "./header.module.css";
import lkpic from "../../assets/pictures/lk.png"
import logopic from "../../assets/pictures/logo1.png"
import { Link } from "react-router-dom";
function Header({ user }) {
  return (
    <header className={styles.header}>
      <div className="l:w-[92%] h-full mx-auto my-0 block clear-fix">
        <div className="px-0 float-left table h-full m:px-10">
          <Link to="/"><img src={logopic} className={styles.logo}></img></Link>
        </div>
        <div className="l:text-2xl m:text-lg s:text-lg  table h-full float-right">
          <div className="l:px-10 m:px-7 s:hidden align-middle table-cell">
            <h1 className={styles.glow}>Рекомендации</h1>
          </div>
          <div className="l:px-10 m:px-7 s:px-3 align-middle table-cell">
            <h1 className={styles.glow}><div className="float-left px-0">💛</div> Избранное </h1>
          </div>
          <form method="post" action="/" className="l:px-10 m:px-5 s:px-3  align-middle table-cell">
            <input className="h-1/2 l:w-[600px] m:w-[400px] s:w-60 rounded-3xl outline-none px-6 mx-0 bg-[#4d4d4d] flex" placeholder="Поиск"></input>
          </form>
          <div className="flex justify-center items-center h-full">
            {user ?
            (<div className="l:px-0 m:px-5 s:px-3">
                <Link to="/user"><img src={lkpic} className={styles.lcab}></img></Link>
            </div>
            ) : (
              <>
                <Link to="/login">
                  <p className={`${styles.glow} l:text-m px-2 s:text-sm`}>Войти</p>
                </Link>
                <p className="text-[]">/</p>
                <Link to="/register">
                  <p className={`${styles.glow} l:text-m px-2 s:text-sm`}>Регистрация</p>
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
