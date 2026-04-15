import axios from "axios";
import { getToken } from "../utils/storage";

const API = axios.create({
  baseURL: "https://code-and-conquer-saas.onrender.com"
});

API.interceptors.request.use(async (req) => {
  const token = await getToken();
  if (token) {
    req.headers.authorization = token;
  }
  return req;
});

export default API;