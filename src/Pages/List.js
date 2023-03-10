import emptyTodo from "../Assets/emptyTodo.png";
import TodoItem from "../Components/TodoItem";
import { useState, useEffect } from "react";
import todoApis from "../Apis/todoApis";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "../Css/Pagination.css"

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageination,setPagination]=useState({page:1,limit:7});
  const [setRerenderLists,setRerenderTodos,rerenderLists,rerenderTodos] = useOutletContext();
  const [isDeletingTodo,setIsDeletingTodo]=useState(false);
  const listId = useParams().id;
  
  useEffect(() => {
    const fetchTodo = async () => {
      setIsLoading(true);
      const res = await todoApis.getById({ listId: listId,page:pageination.page-1,limit:pageination.limit});
      setTasks(res.data);
      setIsLoading(false);
    };

    fetchTodo();
  }, [rerenderTodos,isDeletingTodo,pageination.page]);
  
  return (
    <div>
      {isLoading && <p className="flex justify-center items-center text-[24px] text-second200 mt-[24px]">Loading!!!</p>}
      {tasks?.length === 0 && isLoading === false && (
        <div className="flex justify-center items-center mt-[113px]">
          <img src={emptyTodo}></img>
        </div>
      )}
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
            ></TodoItem>
          ))}
        </div>
      )}
      <div className="flex justify-end mt-[20px] ">
        {tasks.todoCount>1&&<Pagination
          count={Math.ceil(tasks?.todoCount / 7)}
          color="primary"
          size="large"
          page={pageination.page}
          onChange={(event, value) => {
            setPagination({ page: value, limit: 7 });
          }}
          defaultPage={1} siblingCount={1} boundaryCount={1}
        />}
      </div>
    </div>
  );
};

export default List;
