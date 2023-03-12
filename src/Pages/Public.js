import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import StatusMessage from "../Components/StatusMessage";
import LoadingMessage from "../Components/LoadingMessage";
import { useState } from "react";
const Public = () => {
  const [rerenderLists, setRerenderLists] = useState(false);
  const [rerenderTodos, setRerenderTodos] = useState(false);
  const [messageInfo, setMessageInfo] = useState({
    message: "",
    status: "",
  });
  const [triggerMessage, setTriggerMessage] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);

  return (
    <div className="bg-dark900 w-screen min-h-screen flex justify-center">
      <StatusMessage
        triggerMessage={triggerMessage}
        message={messageInfo.message}
        status={messageInfo.status}
        setTriggerMessage={setTriggerMessage}
      ></StatusMessage>
      <LoadingMessage triggerMessage={loadingMessage}></LoadingMessage>
      <div className="max-w-[1440px] w-full px-[113px] pt-[75px]">
        <Header
          setRerenderLists={setRerenderLists}
          setRerenderTodos={setRerenderTodos}
          rerenderLists={rerenderLists}
          rerenderTodos={rerenderTodos}
          triggerMessage={triggerMessage}
          setMessageInfo={setMessageInfo}
          setTriggerMessage={setTriggerMessage}
          setLoadingMessage={setLoadingMessage}
        ></Header>
        <div>
          <Outlet
            context={[
              setRerenderLists,
              setRerenderTodos,
              rerenderLists,
              rerenderTodos,
              setTriggerMessage,
              setMessageInfo,
              setLoadingMessage,
            ]}
          ></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Public;
