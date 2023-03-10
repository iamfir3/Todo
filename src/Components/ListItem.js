import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import Cssclass from "../Css/ListItem.module.css";

const ListItem = ({ name, id }) => {
  
  return (
    <Link
      to={`list/${id}`
    }
      className={`w-full border-l-[10px] border-l-dark600 hover:bg-dark800 transition-all ease-in-out duration-[600ms] h-[60px] justify-between pl-[22px] pr-[14px] text-second200 flex items-center ${Cssclass.ListItem}`}
    >
      <p>{name}</p>
      <SlArrowRight size="28"></SlArrowRight>
    </Link>
  );
};

export default ListItem;
