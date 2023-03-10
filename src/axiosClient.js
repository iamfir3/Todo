import axios from "axios";
const axiosClients = axios.create({
  baseURL: 'https://todoback-production-8ba8.up.railway.app',
});

export default axiosClients;