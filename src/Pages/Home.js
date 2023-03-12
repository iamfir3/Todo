import emptyList from "../Assets/emptyList.png";
import ListItem from "../Components/ListItem";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import listApis from "../Apis/listApis";
import Pagination from "@mui/material/Pagination";
import "../Css/Pagination.css";
import { useSelector, useDispatch } from "react-redux";
import { setPageList } from "../Store/Actions/pageActions";

const Home = () => {
  const [lists, setLists] = useState([]);
  const dispatch = useDispatch();
  const [setRerenderLists, setRerenderTodos, rerenderLists, rerenderTodos] =
    useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const { pageTodo, pageList } = useSelector((state) => state.page);
  const [pagination, setPagination] = useState({ page: pageList, limit: 7 });
  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true);
      const res = await listApis.getAll({
        page: pagination.page - 1,
        limit: pagination.limit,
      });
      setLists(res.data);
      setIsLoading(false);
    };
    fetchLists();
  }, [rerenderLists, pagination.page]);

  return (
    <div className="">
      {isLoading && (
        <p className="flex justify-center items-center text-[24px] text-second200 mt-[24px]">
          Loading!!!
        </p>
      )}

      {!lists && isLoading === false && (
        <div className="mt-[126px] flex justify-center items-center">
          <img src={emptyList} alt="emptyList"></img>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="w-full mt-[50px] flex flex-col gap-[30px]">
            {lists?.length !== 0 &&
              lists?.lists?.map((list) => (
                <ListItem
                  key={list.listId}
                  name={list.listName}
                  id={list.listId}
                ></ListItem>
              ))}
          </div>
          <div className="flex justify-end mt-[20px] text-second200">
            <Pagination
              count={Math.ceil(lists?.listCount / 7)}
              color="primary"
              size="large"
              page={pagination.page}
              onChange={(event, value) => {
                setPagination({ page: value, limit: 7 });
                dispatch(setPageList(value));
              }}
              defaultPage={1}
              siblingCount={1}
              boundaryCount={1}
            />
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Home;
