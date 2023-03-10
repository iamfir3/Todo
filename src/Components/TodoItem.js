import Cssclass from "../Css/Checkbox.module.css";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import todoApis from "../Apis/todoApis";
import { useEffect, useState } from "react";
const TodoItem = ({ name, id, isDone, isDeletingTodo, setIsDeletingTodo }) => {
  const [done, setDone] = useState(isDone);

  return (
    <div
      className={`w-full flex h-[60px] bg-dark800 hover:bg-dark700 transition-all ease-in-out rounded-[4px] py-[18px] pl-[32px] items-center justify-between pr-[24.5px] gap-[15px] ${Cssclass.wholeContainer}`}
    >
      <div className="flex items-center  gap-[15px]">
        <label className={`${Cssclass.container}`}>
          <input
            type="checkbox"
            className="hidden"
            checked={done ? true : false}
            onChange={() => {
              const updateTodo = async () => {
                const res=await todoApis.updateTodo({
                  content:name,
                  todoId:id,
                  done:done ? 0:1
                })
              };
              updateTodo();

              setTimeout(() => {
                setDone((prev) => !prev);
              }, 100);
            }}
          ></input>
          <div
            className={`bg-dark800 w-[20px] h-[20px] absolute top-[50%] left-[50%] z-[10] translate-x-[-52%] translate-y-[-50%]`}
          ></div>
          <div className={`${Cssclass.check}`}>
            <AiOutlineCheck
              size="18"
              className="absolute top-[3px] left-[4px] z-[11] text-second200"
            ></AiOutlineCheck>
          </div>
        </label>
        <p className="text-second200 text-[16px]">{name}</p>
      </div>
      <div
        className={`flex items-center justify-center ${Cssclass.trash}`}
        onClick={() => {
          const deleteTodo = async () => {
            const res = todoApis.deleteTodo({ todoId: id });
          };
          deleteTodo();
          setTimeout(() => {
            setIsDeletingTodo((prev) => !prev);
          }, 500);
        }}
      >
        <BsFillTrashFill
          className="justify-self-end text-second200 cursor-pointer"
          size="24"
        ></BsFillTrashFill>
      </div>
    </div>
  );
};

export default TodoItem;
