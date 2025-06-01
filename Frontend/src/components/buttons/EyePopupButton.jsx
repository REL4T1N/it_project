import { Eye, EyeOff } from "lucide-react";

const EyePopupButton = ({ open, setOpen }) => (
  <button
    onClick={() => setOpen((prev) => !prev)}
    className={`
      w-[50px] h-[50px] rounded-full bg-[#232323] flex items-center justify-center
      transition-all duration-200 shadow-md
      hover:bg-[#292929]
    `}
  >
    {open ? (
      <EyeOff className="w-6 h-6 text-[#DBF231]" />
    ) : (
      <Eye className="w-6 h-6 text-[#a3ae49]" />
    )}
  </button>
);

export default EyePopupButton;