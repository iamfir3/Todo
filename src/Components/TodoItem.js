import Cssclass from "../Css/Checkbox.module.css";
import { AiOutlineCheck } from "react-icons/ai";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import todoApis from "../Apis/todoApis";
import { useState, useRef } from "react";
const TodoItem = ({
  name,
  id,
  isDone,
  isDeletingTodo,
  setIsDeletingTodo,
  createDate,
  modifyDate,
  setChangeIsDone,
  setLoadingMessage,
  setTriggerMessage,
  setMessageInfo,
}) => {
  const [isEditTodo, setIsEditTodo] = useState();
  const [inputValue, setInputValue] = useState("");
  const [todoItemInfo, setTodoItemInfo] = useState({
    name: name,
    id: id,
    isDone: isDone,
    createDate: createDate,
    modifyDate: modifyDate,
  });
  const inputRef = useRef();

  let dayBegin = {
    year: new Date(createDate).getFullYear(),
    month: new Date(createDate).getMonth(),
    day: new Date(createDate).getDate(),
  };
  let dayFinish = {
    year: new Date(modifyDate).getFullYear(),
    month: new Date(modifyDate).getMonth(),
    day: new Date(modifyDate).getDate(),
  };

  return (
    <div
      className={`w-full flex min-h-[60px] bg-dark800 hover:bg-dark700 transition-all ease-in-out rounded-[4px] py-[18px] pl-[32px] items-center justify-between  pr-[24.5px] gap-[15px] overflow-hidden ${Cssclass.wholeContainer}`}
    >
      <div className="flex items-center  gap-[15px] w-[40%]">
        <label className={`${Cssclass.container}`}>
          <input
            type="checkbox"
            className="hidden"
            checked={todoItemInfo.isDone ? true : false}
            onChange={() => {
              const updateTodo = async () => {
                try{
                  setLoadingMessage(true);
                  const res = await todoApis.updateTodo({
                    content: todoItemInfo.name,
                    todoId: todoItemInfo.id,
                    done: todoItemInfo.isDone ? 0 : 1,
                  });
                  setLoadingMessage(false);
                  setTodoItemInfo({
                    name: res.data.content,
                    isDone: res.data.done,
                    id: res.data.todoId,
                    createDate: res.data.createDate,
                    modifyDate: res.data.modifyDate,
                  });

                }
                catch (e) {

                }
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
        <p className="text-second200 text-[16px] w-[80%]">{todoItemInfo.name}</p>
      </div>
      <div
        className={`flex items-center justify-center w-[50%] justify-around px-[20px] ${Cssclass.rightContainer}`}
      >
        {!isEditTodo && (
          <div className={`flex gap-[10px] w-[50%] ${Cssclass.day}`}>
            <p className="text-second200 text-[14px]">
              Begin: {`${dayBegin.day}/${dayBegin.month}/${dayBegin.year}`}
            </p>

            <p className="text-second200 text-[14px]">
              {todoItemInfo.isDone
                ? `Finish: ${dayFinish.day}/${dayFinish.month}/${dayFinish.year}`
                : ""}
            </p>
          </div>
        )}
        <div
          className={`flex items-center gap-[20px] justify-center relative ${Cssclass.trash}`}
        >
          <input
            onBlur={() => {
              setInputValue("");
              setIsEditTodo(false);
            }}
            className={`ml-[50px] outline-none border-[2px] border-dark800 px-[10px] py-[8px] rounded-[10px] ${
              isEditTodo ? "" : "translate-x-[100px] opacity-0 absolute z-[2]"
            } transition-all`}
            maxLength="200"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            ref={inputRef}
          ></input>

          <p
            className={`text-[14px] text-second200 ${
              inputValue === "" ? "hidden" : ""
            }`}
          >
            {inputValue.length}/200
          </p>
          {!isEditTodo && (
            <BsFillPencilFill
              className="justify-self-end text-second200 cursor-pointer"
              size="24"
              onClick={() => {
                setIsEditTodo(true);
                inputRef.current.focus();
              }}
            ></BsFillPencilFill>
          )}
          {isEditTodo && (
            <BsFillCheckCircleFill
              className="justify-self-end text-second200 cursor-pointer"
              size="24"
              onMouseDown={() => {
                const updateTodo = async () => {
                  try{
                    setLoadingMessage(true);
                    const res = await todoApis.updateTodo({
                      content: inputValue,
                      todoId: todoItemInfo.id,
                      done: todoItemInfo.isDone,
                    });
                    setLoadingMessage(false);
                    if(res.status===200){
                      if(res.data.statusCode==='200'){

                        setTriggerMessage(true);
                        setMessageInfo({
                          message:'Todo Updated successfully',
                          status:'success'
                        })
                        setTodoItemInfo({
                          name: res.data.content,
                          isDone: res.data.done,
                          id: res.data.todoId,
                          createDate: res.data.createDate,
                          modifyDate: res.data.modifyDate,
                        });
                      }
                      else if(res.data.statusCode==="1"){
                        setTriggerMessage(true);
                        setMessageInfo({
                          message:res.data.message,
                          status:'error'
                        })
                      }
                      setInputValue("");
                    }
                  }
                  catch(e){
                    setTriggerMessage(true);
                    setMessageInfo({
                      message:"Something went wrong. Please try again!",
                      status:'error'
                    })
                  }
                };
                updateTodo();
                inputRef.current.value='';
              }}
            ></BsFillCheckCircleFill>
          )}
          <BsFillTrashFill
            className="justify-self-end text-second200 cursor-pointer relative z-[3]"
            size="24"
            onClick={() => {
              const deleteTodo = async () => {
                try{
                  setLoadingMessage(true);
                  const res = await todoApis.deleteTodo({ todoId: id });
                  setLoadingMessage(false);
                  if(res.status===200){
                    setTriggerMessage(true);
                    setMessageInfo({
                      message:'Todo deleted',
                      status:'success'
                    })
                    setIsDeletingTodo((prev) => !prev);
                  }
                }
                catch(e){
                  setTriggerMessage(true);
                  setMessageInfo({
                    message:"Something went wrong. Please try again!",
                    status:'error'
                  })
                }
              };
              deleteTodo();
            }}
          ></BsFillTrashFill>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
