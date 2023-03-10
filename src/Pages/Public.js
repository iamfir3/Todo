import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const Public = () => {
  const [rerenderLists,setRerenderLists] = useState(false);
  const [rerenderTodos,setRerenderTodos] = useState(false);

  return (
    <div className="bg-dark900 w-screen h-screen flex justify-center">
      <div className="max-w-[1440px] w-full px-[113px] pt-[75px]">
        <Header setRerenderLists={setRerenderLists} setRerenderTodos={setRerenderTodos} rerenderLists={rerenderLists} rerenderTodos={rerenderTodos}></Header>
        <div>
          <Outlet context={[setRerenderLists,setRerenderTodos,rerenderLists,rerenderTodos]}></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Public;
