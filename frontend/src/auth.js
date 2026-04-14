import { useState } from "react";
import axios from "axios";

const BASE = "https://scaling-succotash-w5aw.onrender.com/api/auth";

function Auth({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    await axios.post(`${BASE}/register`, form);
    alert("Registered!");
  };

  const login = async () => {
    const res = await axios.post(`${BASE}/login`, form);
    setUser(res.data.user);
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" onChange={handleChange} placeholder="Password" />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Auth;