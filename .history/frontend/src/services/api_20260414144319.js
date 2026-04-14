import axios from "axios";

const API = axios.create({
  baseURL: "https://scaling-succotash-w5aw.onrender.com/api"
});

export default API;