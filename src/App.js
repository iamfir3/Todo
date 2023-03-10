import { Route, Routes } from "react-router-dom";
import { path } from "./Utils/Constans";
import Home from "./Pages/Home";
import List from "./Pages/List";
import Public from "./Pages/Public";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path={path.PUBLIC} element={<Public></Public>}>
          <Route
            path="*"
            element={<NotFound></NotFound>}
          ></Route>
          <Route path={path.HOME} element={<Home></Home>}></Route>
          <Route path={path.LIST} element={<List></List>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
