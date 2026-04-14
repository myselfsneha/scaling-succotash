import axios from "axios";

const api = axios.create({
  baseURL: "https://scaling-succotash-w5aw.onrender.com/api",
});

export default api;