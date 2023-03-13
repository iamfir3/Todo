import Button from "./Button";
import {
  BsPlusCircle,
  BsArrowLeftCircle,
  BsFillTrashFill,
  BsPlusSquare,
} from "react-icons/bs";
import { BiRename } from "react-icons/bi";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import listApis from "../Apis/listApis";
import todoApis from "../Apis/todoApis";
import ButtonWithInput from "./ButtonWithInput";
import { setPageTodo } from "../Store/Actions/pageActions";

const Header = ({
  setRerenderLists,
  setRerenderTodos,
  triggerMessage,
  setMessageInfo,
  setTriggerMessage,
  setLoadingMessage,
}) => {
  const param = useParams()["*"].split("/")[0];
  const params = useParams()["*"]?.split("/")[1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listDetail, setListDetail] = useState();
  const [isAddingList, setIsAddingList] = useState(false);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRenameList, setIsRenameList] = useState(false);
  const [rerender, setRerender] = useState(false);

  const inputListRef = useRef();
  const inputTodoRef = useRef();
  const inputRenameListRef = useRef();

  useEffect(() => {
    const fetchDetailList = async () => {
      const res = await listApis.getById({ listId: params });

      setListDetail(res.data);
    };

    if (param === "list") fetchDetailList();
  }, [params, rerender]);

  return (
    <div className="w-full flex justify-between items-center py-[11px] border-b-[1px] border-b-primary">
      <div>
        {param === "" && (
          <p className="font-700 text-second200 text-[24px]">
            TO DO | YOUR LISTS
          </p>
        )}
        {param === "list" && (
          <div className="flex items-center gap-[24px]">
            <BsArrowLeftCircle
              size="36"
              className="text-dark600 cursor-pointer"
              onClick={() => {
                navigate(-1);
                dispatch(setPageTodo(1));
              }}
            ></BsArrowLeftCircle>
            <div className="w-[400px] whitespace-nowrap overflow-hidden">
              <p className="text-second200 text-[22px] ">
                {listDetail?.listName}
              </p>
            </div>
          </div>
        )}
      </div>
      <div>
        {param === "" && (
          <>
            <ButtonWithInput
              isAdding={isAddingList}
              inputRef={inputListRef}
              isLoading={isLoading}
              icon={<BsPlusCircle size="24"></BsPlusCircle>}
              content="Add new list"
              maxLength={"35"}
              setIsAdding={setIsAddingList}
              func={() => {
                const addList = async () => {
                  try {
                    setIsLoading(true);
                    setLoadingMessage(true);
                    const res = await listApis.createList({
                      listName: inputListRef.current.value,
                    });

                    inputListRef.current.value = "";
                    setLoadingMessage(false);
                    if (res.status === 200) {
                      setRerenderLists((prev) => !prev);
                      setTriggerMessage(true);
                      setMessageInfo({
                        message: "Add successfully",
                        status: "success",
                      });
                    }
                    setIsLoading(false);
                  } catch (e) {
                    setTriggerMessage(true);
                    setMessageInfo({
                      message: "Something went wrong. Try again later!",
                      status: "error",
                    });
                  }
                };

                addList();
              }}
            ></ButtonWithInput>
          </>
        )}
        {param === "list" && (
          <div className="flex gap-[24px]">
            <Button
              Icons={<BsFillTrashFill size="24"></BsFillTrashFill>}
              text="Delete list"
              func={() => {
                const deleteList = async () => {
                  try {
                    setLoadingMessage(true);
                    const res = await listApis.deleteList({
                      listId: listDetail.listId,
                    });
                    setLoadingMessage(false);
                    if (res.status === 200) {
                      setTriggerMessage(true);
                      setMessageInfo({
                        message: "Delete successfully",
                        status: "success",
                      });
                    }
                    navigate("");
                  } catch (e) {
                    setTriggerMessage(true);
                    setMessageInfo({
                      message: "Something went wrong. Try again later!",
                      status: "error",
                    });
                  }
                };

                deleteList();
              }}
            ></Button>

            <ButtonWithInput
              isAdding={isAddingTodo}
              inputRef={inputTodoRef}
              icon={<BsPlusSquare size="24"></BsPlusSquare>}
              content="Add new todo"
              maxLength={"200"}
              setIsAdding={setIsAddingTodo}
              func={() => {
                const addTodo = async () => {
                  try {
                    setLoadingMessage(true);
                    const res = await todoApis.createTodo({
                      content: inputTodoRef.current.value,
                      listId: listDetail.listId,
                      done: 0,
                    });
                    inputTodoRef.current.value = "";
                    setLoadingMessage(false);

                    if (res.status === 200) {
                      setTriggerMessage(true);
                      setMessageInfo({
                        message: "Add successfully",
                        status: "success",
                      });
                      setRerenderTodos((prev) => !prev);
                    }
                  } catch (e) {
                    setTriggerMessage(true);
                    setMessageInfo({
                      message: "Something went wrong. Try again later!",
                      status: "error",
                    });
                  }
                };

                addTodo();
              }}
            ></ButtonWithInput>

            <ButtonWithInput
              isAdding={isRenameList}
              inputRef={inputRenameListRef}
              icon={<BiRename size="24"></BiRename>}
              content="Rename list"
              setIsAdding={setIsRenameList}
              func={() => {
                const renameList = async () => {
                  try {
                    setLoadingMessage(true);

                    const res = await listApis.updateList({
                      listName: inputRenameListRef.current.value,
                      listId: listDetail.listId,
                    });
                    setLoadingMessage(false);

                    if (res.status === 200) {
                      setTriggerMessage(true);
                      setMessageInfo({
                        message: "Rename successfully",
                        status: "success",
                      });

                      setRerender((prev) => !prev);
                    }
                    inputRenameListRef.current.value = "";
                  } catch (e) {
                    setTriggerMessage(true);
                    setMessageInfo({
                      message: "Something went wrong. Try again later!",
                      status: "error",
                    });
                  }
                };

                renameList();
              }}
            ></ButtonWithInput>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
