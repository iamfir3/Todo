import actions from "../Actions/actionTypes";

const initState = {
  lists: [],
  listTemp:[],
  message: "",
};

const homeReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.FETCH_LIST_SUCCESS:
      return {
        ...state,
        lists: action.lists,
        message: "Success",
      };
    case actions.FETCH_LIST_FAILURE:
      return {
        ...state,
        lists: [],
        messages: action.message,
      };

    default:
      return state;
  }
};

export default homeReducer;
