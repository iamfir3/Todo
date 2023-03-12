import actionTypes from "../Actions/actionTypes";

const init = {
  pageList: 1,
  pageTodo: 1,
};

const pageReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE_LIST:
      return {
        ...state,
        pageList: action.page,
        pageTodo: 1,
      };
    case actionTypes.SET_PAGE_TODO:
      return {
        ...state,
        pageList: state.pageList,
        pageTodo: action.page,
      };
    default:
      return state;
  }
};

export default pageReducer;
