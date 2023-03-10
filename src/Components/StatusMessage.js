import {BsFillCheckCircleFill} from "react-icons/bs";
import {BiErrorCircle} from "react-icons/bi";
import { useState } from "react";
const StatusMessage=({message,flag,func})=>{

    return <div className={`w-[340px] h-[74px] bg-dark700 absolute rounded-[10px] top-[-80px] ${flag===1?'animate-top-popup':''}`} onAnimationEnd={()=>{func()}}>

    </div>
}

export default StatusMessage;