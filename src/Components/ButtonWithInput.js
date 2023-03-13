import Button from "./Button";
import { BsFillCheckCircleFill } from "react-icons/bs";
import LoadingIcon from "./LoadingIcon";
import { useState } from "react";
const ButtonWithInput = ({
  isAdding,
  inputRef,
  icon,
  setIsAdding,
  isLoading,
  func,
  content,
  maxLength
}) => {
  const [inputValue,setInputValue]=useState('');
  console.log(inputValue);
  return (
    <div
      className={`flex relative text-primary gap-[18px] items-center ${
        isAdding ? "bg-dark700" : ""
      } hover:bg-dark700 transition-all ease-in-out duration-[600ms] rounded-[40px] cursor-pointer overflow-hidden`}
    >
      <div
        className={`${
          isAdding === true
            ? " absolute translate-y-[-300px]"
            : "translate-y-[0px]"
        } transition-all ease-in-out duration-[600ms] `}
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        <Button
          Icons={icon}
          text={content}
          func={() => {
            inputRef.current.focus();
          }}
        ></Button>
      </div>
      <div
        className={`flex items-center ${
          isAdding ? "translate-y-[0px]" : "translate-y-[200px] absolute"
        } transition-all ease-in-out duration-[600ms] w-full h-[59px] px-[26px] py-[16px] `}
      >
        <input
          className="outline-none bg-dark700 px-[10px] py-[5px] w-[140px]"
          onBlur={() => {
            setIsAdding(false);
          }}
          onFocus={() => {
            setIsAdding(true);
          }}
          onChange={(e)=>{setInputValue(e.target.value)}}
          ref={inputRef}
          maxLength={maxLength}
        ></input>
        <p className={`text-[14px] mr-[10px] ${inputValue===''?'hidden':''}`}>{inputValue.length}/{maxLength}</p>
        {!isLoading && (
          <BsFillCheckCircleFill
            size="28px"
            onMouseDown={(e) => {
              func();
              setInputValue('');
            }}
            className={`${inputValue===''?'translate-x-[100px]':'translate-x-[0px]'} translate-all ease-in-out`}
          
          ></BsFillCheckCircleFill>
        )}
        {isLoading && <LoadingIcon></LoadingIcon>}
      </div>
    </div>
  );
};

export default ButtonWithInput;
