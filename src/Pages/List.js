import emptyTodo from "../Assets/emptyTodo.png";
import TodoItem from "../Components/TodoItem";
import { useState, useEffect } from "react";
import todoApis from "../Apis/todoApis";
import { useParams } from "react-router-dom";
import { useOutletContext,useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "../Css/Pagination.css";
import notFoundImage from "../Assets/404.jpg";
import { useSelector,useDispatch } from "react-redux";
import { setPageTodo } from "../Store/Actions/pageActions";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {pageList,pageTodo} =useSelector(state=>state.page);
  const dispatch=useDispatch();
  const [pageination, setPagination] = useState({ page: pageTodo, limit: 7 });
  const [isNotFound, setIsNotFound] = useState(false);
  const [changeIsDone, setChangeIsDone] = useState(false);
  const navigate=useNavigate();
  const [setRerenderLists, setRerenderTodos, rerenderLists, rerenderTodos,setTriggerMessage,setMessageInfo,setLoadingMessage] =
    useOutletContext();
  const [isDeletingTodo, setIsDeletingTodo] = useState(false);
  const listId = useParams().id;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setIsLoading(true);
        const res = await todoApis.getById({
          listId: listId,
          page: pageination.page - 1,
          limit: pageination.limit,
        });
        setTasks(res.data);
        setIsLoading(false);
      } catch (e) {
        setIsNotFound(true);
        setTimeout(()=>{navigate('/')},2000)
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [rerenderTodos, isDeletingTodo, pageination.page,changeIsDone]);

  return (
    <div className="relative">
      {isLoading && (
        <p className="flex justify-center items-center text-[24px] text-second200 mt-[24px]">
          Loading!!!
        </p>
      )}
      {tasks?.length === 0 && isLoading === false&&!isNotFound && (
        <div className="flex justify-center items-center mt-[113px]">
          <img src={emptyTodo} ></img>
        </div>
      )}
      {isNotFound && <div className="flex justify-center items-center mt-[100px]">
        <img src={notFoundImage} alt="notFound" className='w-[800px] h-[533px] '></img>
      </div>
      }
      {!isLoading && (
        <>
          {tasks?.length !== 0 && (
            <div className="flex flex-col gap-[20px] mt-[50px] ">
              {tasks?.todos?.map((task) => (
                <TodoItem
                  name={task?.content}
                  id={task?.todoId}
                  isDone={task?.done}
                  key={task.todoId}
                  isDeletingTodo={isDeletingTodo}
                  setIsDeletingTodo={setIsDeletingTodo}
                  createDate={task?.createDate}
                  modifyDate={task?.modifyDate}
                  setChangeIsDone={setChangeIsDone}
                  setLoadingMessage={setLoadingMessage}
                  setTriggerMessage={setTriggerMessage}
                  setMessageInfo={setMessageInfo}
                ></TodoItem>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-[20px] ">
            {tasks.todoCount > 1 && (
              <Pagination
                count={Math.ceil(tasks?.todoCount / 7)}
                color="primary"
                size="large"
                page={pageination.page}
                onChange={(event, value) => {
                  setPagination({ page: value, limit: 7 });
                  dispatch(setPageTodo(value))
                }}
                defaultPage={1}
                siblingCount={1}
                boundaryCount={1}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
