import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://agri-share.onrender.com/api",
  withCredentials: true,
});

export default api;
