import axiosClients from "../axiosClient";
const listApis = {
  getAll: (params) => {
    const url = "/list";
    return axiosClients.get(url, { params });
  },
  getById: (params) => {
    const url = `/list/${params.listId}`;
    return axiosClients.get(url);
  },
  createList: (data) => {
    const url = "/list";
    return axiosClients.post(url, data);
  },
  updateList: (data) => {
    const url = "/list";
    return axiosClients.post(url, data);
  },
  deleteList: (params) => {
    const url = `/list/${params.listId}`;
    return axiosClients.delete(url);
  },
};

export default listApis;
