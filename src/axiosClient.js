import axios from "axios";
const axiosClients = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axiosClients;