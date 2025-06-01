import { Link } from "react-router-dom";
import styles from "./premiere.module.css";
function Premiere({ props }) {
  return (
    <Link to={`/movies/${props?.kp_id}`} className="rounded-2xl">
      <div className="bg-[#222222] my-8 flex w-[1400px] mx-auto">
        <div className="h-[400px] bg-[#2e2c2c] w-2/4 min-w-80">
          <h1 className="text-[#DBF231] text-4xl px-20 py-8 font-[Montserrat]">{props?.name}</h1>
          <div className="px-16 text-[#a3ae49] text-xl h-full">
            <p className="">{props?.description}</p>
          </div>
        </div>
        <div className="h-[400px] flex-1 relative">
          <img
            src={props?.backdrop}
            alt="Premiere"
            className={`w-full h-full object-contain`}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
      </div>
    </Link>
  );
}

export default Premiere;
