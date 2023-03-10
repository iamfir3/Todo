import Cssclass from "../Css/Button.module.css";

const Button = ({ Icons, text, func }) => {
  return (
    <div
      className={`flex text-primary gap-[18px] items-center hover:bg-dark700 transition-all ease-in-out duration-[600ms] rounded-[40px] px-[26px] py-[16px] cursor-pointer ${Cssclass.Button}`}
      onClick={() => {
        func();
      }}
    >
      <div className=" transition-all ease-in-out duration-[500ms]">{Icons}</div>
      <p className="text-[18px] transition-all ease-in-out duration-[500ms]">{text}</p>
    </div>
  );
};

export default Button;
