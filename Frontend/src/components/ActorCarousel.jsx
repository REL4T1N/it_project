const ActorCarousel = ({data}) => {
  return (
    <div className="overflow-y-auto bg-[#161616] rounded-2xl shadow-2xl border border-[#2c2c2e] px-7 py-4">
      <h2 className="text-[#bfc3a2] text-2xl font-bold mb-4 pl-2">Актеры</h2>
      <div className="flex flex-col space-y-6">
        {data.map((actor, idx) => (
          <div
            key={actor?.id}
            className="flex items-center bg-[#23251d] rounded-xl p-3 hover:scale-[1.010] transition shadow-lg"
          >
            <img
              src={actor?.photo}
              alt={actor?.name}
              className="w-16 h-16 object-cover rounded-xl border border-[#C6D459] mr-4"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[#C6D459] text-lg font-bold">{idx + 1}.</span>
                {(actor.name) ? (<span className="text-[#C6DE17] text-lg font-semibold">{actor?.name}</span>) : (<span className="text-[#C6DE17] text-lg font-semibold">Имя не указано</span>)}
              </div>
              <p className="text-[#a3ae49] text-sm">{actor?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorCarousel;