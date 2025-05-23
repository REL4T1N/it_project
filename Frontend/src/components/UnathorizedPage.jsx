import { Link } from 'react-router-dom';
import catImg from '../assets/okak-8.png'; 
import Button from './Button';
export default function UnauthorizedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-row items-center w-full max-w-[1400px] gap-12">
        <div className="relative bg-[#1A1A1A] rounded-2xl p-10 text-[#C6DE17] overflow-hidden flex-[2_2_0%] min-w-0 max-w-[700px]">
          <h1 className="absolute inset-0 flex items-center justify-center font-extrabold text-[clamp(120px,18vw,320px)] leading-none text-[#2b2f39] select-none pointer-events-none opacity-30">
            401
          </h1>
          <div className="relative z-10 flex flex-col gap-8">
            <h2 className="font-black leading-tight uppercase text-[clamp(36px,5vw,76px)] max-w-full break-words">
              Страница <br /> недоступна
            </h2>
            <p className="max-w-full text-[#a3ae49] text-[clamp(18px,2.5vw,32px)] break-words">
              Похоже, вы не вошли в систему. <br /> Пожалуйста, авторизуйтесь, чтобы продолжить.
            </p>
            <div className="flex w-[560px]  py-[30px]">
            <Link
              to="/login"
            >
              <Button  title='Окак, ну пожалуй войду'></Button>
            </Link>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center flex-[3_3_0%] min-w-0 max-w-[700px]">
          <img
            src={catImg}
            alt="Hoodie cat"
            className="w-[40vw] max-w-[400px] min-w-[160px] h-auto object-contain select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}