import actionTypes from "./actionTypes";

export const setPageList=(page)=>{
    return {
        type:actionTypes.SET_PAGE_LIST,
        page:page
    }
}

export const setPageTodo=(page)=>{
    return {
        type:actionTypes.SET_PAGE_TODO,
        page:page
    }
}