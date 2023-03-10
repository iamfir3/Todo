import actionTypes from "./actionTypes";
import listApis from "../../Apis/listApis";

export const fetchList = (payload) => async (dispatch) => {
  try {
    const res = await listApis.getAll();
    
    if (res.status===200) {
      dispatch({
        type: actionTypes.FETCH_LIST_SUCCESS,
        lists: res.data,
      });
    } else {
      dispatch({
        type: actionTypes.FETCH_LIST_FAILURE,
        message: res.message,
      });
    }
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_LIST_FAILURE,
      message: err.message,
    });
  }
};
