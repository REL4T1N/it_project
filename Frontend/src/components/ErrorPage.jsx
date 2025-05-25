import React from "react";

const ErrorPage = () => {
  return (
    <section className="min-h-screen bg-[#0f1116] flex items-center justify-center px-4">
      {/* контейнер из двух колонок */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* левая карточка */}
        <div className="relative bg-[#1a1d25] rounded-2xl p-10 text-white overflow-hidden">
          {/* «водяной» 404 позади */}
          <h1
            className="absolute inset-0 flex items-center justify-center
                       font-extrabold text-[22rem] leading-none
                       text-[#2b2f39] select-none pointer-events-none
                       opacity-10"
          >
            404
          </h1>

          <div className="relative z-10 flex flex-col gap-6">
            <h2 className="font-black text-5xl md:text-6xl leading-tight uppercase">
              Страница <br /> не работает
            </h2>

            <p className="max-w-sm text-[#c5c9d2]">
              Пока не знаем в чём проблема, <br />
              но мы скоро это починим.
            </p>

            <Link
              to="/"
              className="w-max mt-2 px-6 py-3 rounded-lg bg-[#656dff] hover:bg-[#7f87ff]
                         font-medium text-sm md:text-base transition-colors"
            >
              Окак, на главную
            </Link>
          </div>
        </div>

        {/* правая часть — картинка кота */}
        <div className="relative flex items-center justify-center">
          <img
            src={catImg}
            alt="Hoodie cat"
            className="max-h-[500px] object-contain select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};
export default ErrorPage;
