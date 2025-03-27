const Button = (props) => {
    const { title, icon, position, handleClick, otherClasses } = props;
  
    return (
      <button
        className="relative inline-flex h-12 w-full overflow-hidden rounded-2xl p-[1px] 
                   focus:outline-none md:w-60 md:mt-10"
        onClick={handleClick}           
      >
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
    bg-[conic-gradient(from_90deg_at_50%_50%,#f8ff99_0%,#f4ff54_50%,#f0ff17_100%)]"
        />
        <span
          className={`inline-flex h-full w-full hover:bg-[#000310fa] cursor-pointer items-center 
    justify-center rounded-2xl bg-[#1A1A1A] px-7 text-lg font-bold font-[Montserrat] text-[#f6ff75] backdrop-blur-3xl gap-2 ${otherClasses}`}
        >
          {position === 'left' && icon}
          {title}
          {position === 'right' && icon}
        </span>
      </button>
    );
  };
  
  export default Button;