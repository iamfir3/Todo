import axiosClients from "../axiosClient";
const todoApis = {
  getById: (params) => {
    const url = `/todo`;
    return axiosClients.get(url,{params});
  },
  createTodo: (data) => {
    const url = "/todo";
    return axiosClients.post(url, data);
  },
  deleteTodo: (params) => {
    const url = `/todo/${params.todoId}`;
    return axiosClients.delete(url);
  },
  updateTodo: (data) => {
    const url = "/todo";
    return axiosClients.put(url, data);

  }
};

export default todoApis;
