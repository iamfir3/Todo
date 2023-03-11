import Cssclass from "../Css/Checkbox.module.css";
import { AiOutlineCheck } from "react-icons/ai";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import todoApis from "../Apis/todoApis";
import { useEffect, useState } from "react";
const TodoItem = ({
  name,
  id,
  isDone,
  isDeletingTodo,
  setIsDeletingTodo,
  createDate,
  modifyDate,
  setChangeIsDone,
}) => {
  const [done, setDone] = useState(isDone);
  const [isEditTodo, setIsEditTodo] = useState();
  const [inputValue, setInputValue] = useState("");
  const [todoItemInfo, setTodoItemInfo] = useState({
    name: name,
    id: id,
    isDone: isDone,
    createDate: createDate,
    modifyDate: modifyDate,
  });

  let dayBegin = {
    year: new Date(todoItemInfo.createDate).getFullYear(),
    month: new Date(todoItemInfo.createDate).getMonth(),
    day: new Date(todoItemInfo.createDate).getDate(),
  };
  let dayFinish = {
    year: new Date(todoItemInfo.modifyDate).getFullYear(),
    month: new Date(todoItemInfo.modifyDate).getMonth(),
    day: new Date(todoItemInfo.modifyDate).getDate(),
  };

  return (
    <div
      className={`w-full flex h-[60px] bg-dark800 hover:bg-dark700 transition-all ease-in-out rounded-[4px] py-[18px] pl-[32px] items-center justify-between pr-[24.5px] gap-[15px] overflow-hidden ${Cssclass.wholeContainer}`}
    >
      <div className="flex items-center  gap-[15px]">
        <label className={`${Cssclass.container}`}>
          <input
            type="checkbox"
            className="hidden"
            checked={todoItemInfo.isDone ? true : false}
            onChange={() => {
              const updateTodo = async () => {
                const res = await todoApis.updateTodo({
                  content: todoItemInfo.name,
                  todoId: todoItemInfo.id,
                  done: todoItemInfo.isDone ? 0 : 1,
                });
                setTodoItemInfo({
                  name: res.data.content,
                  isDone: res.data.done,
                  id: res.data.todoId,
                  createDate: res.data.createDate,
                  modifyDate: res.data.modifyDate,
                });
                // setChangeIsDone((prev) => !prev);
              };
              updateTodo();
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
        <p className="text-second200 text-[16px]">{todoItemInfo.name}</p>
      </div>
      <div className={`flex gap-[10px] ${Cssclass.day}`}>
        <p className="text-second200 text-[14px]">
          Begin: {`${dayBegin.day}/${dayBegin.month}/${dayBegin.year}`}
        </p>

        <p className="text-second200 text-[14px]">
          {todoItemInfo.isDone
            ? `Finish: ${dayFinish.day}/${dayFinish.month}/${dayFinish.year}`
            : ""}
        </p>
      </div>
      <div
        className={`flex items-center gap-[20px] justify-center ${Cssclass.trash}`}
      >
        {isEditTodo && (
          <input
            onBlur={() => {
              setInputValue("");
              setIsEditTodo(false);
            }}
            className="ml-[50px] outline-none border-[2px] border-dark800 px-[10px] py-[8px] rounded-[10px]"
            maxLength="35"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          ></input>
        )}
        <p
          className={`text-[14px] text-second200 ${
            inputValue === "" ? "hidden" : ""
          }`}
        >
          {inputValue.length}/35
        </p>
        {!isEditTodo && (
          <BsFillPencilFill
            className="justify-self-end text-second200 cursor-pointer"
            size="24"
            onClick={() => {
              setIsEditTodo(true);
            }}
          ></BsFillPencilFill>
        )}
        {isEditTodo && (
          <BsFillCheckCircleFill
            className="justify-self-end text-second200 cursor-pointer"
            size="24"
          ></BsFillCheckCircleFill>
        )}
        <BsFillTrashFill
          className="justify-self-end text-second200 cursor-pointer"
          size="24"
          onClick={() => {
            const deleteTodo = async () => {
              const res = todoApis.deleteTodo({ todoId: id });
              setIsDeletingTodo((prev) => !prev);
            };
            deleteTodo();
          }}
        ></BsFillTrashFill>
      </div>
    </div>
  );
};

export default TodoItem;
