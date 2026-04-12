import { API } from "./api";

export const loginUser = async (email, password) => {
  try {
    const res = await API.post("/login", { email, password });
    return res.data;
  } catch (err) {
    console.log(err.response?.data || err.message);
    throw err;
  }
};