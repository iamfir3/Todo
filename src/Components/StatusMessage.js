import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useState } from "react";
const StatusMessage = ({
  message,
  status,
  triggerMessage,
  setTriggerMessage,
}) => {
  return (
    <div
      className={`min-w-[340px] px-[20px] h-[50px] ${
        status === "success" ? "bg-green" : "bg-primary"
      } absolute flex rounded-[10px] top-[-80px] ${
        triggerMessage ? "animate-top-popup" : ""
      } justify-center gap-[20px] items-center z-[20]`}
      onAnimationEnd={() => {
        setTriggerMessage(false);
      }}
    >
      {status === "success" && (
        <>
          <p className="text-second200 font-[500] text-[18px]">{message}</p>
          <BsFillCheckCircleFill
            size="30"
            className="text-second200 font-[600]"
          ></BsFillCheckCircleFill>
        </>
      )}
      {status === "error" && (
        <>
          <p className="text-second200 font-[500] text-[18px]">{message}</p>
          <BiErrorCircle
            size="30"
            className="text-second200 font-[600]"
          ></BiErrorCircle>
        </>
      )}
    </div>
  );
};

export default StatusMessage;
