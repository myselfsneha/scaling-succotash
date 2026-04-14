import axios from "axios";

const API = axios.create({
  baseURL: "https://scaling-succotash-w5aw.onrender.com/api"
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;