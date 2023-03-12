
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import pageReducer from "./pageReducer"
import { combineReducers } from "redux";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const pageConfig = {
  ...commonConfig,
  key: "page",
  whitelist: ["pageList", "pageTodo"],
};

const rootReducer = combineReducers({
  page:persistReducer(pageConfig,pageReducer)
});

export default rootReducer;
