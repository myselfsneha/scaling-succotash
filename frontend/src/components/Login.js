import { useState } from "react";
import API from "../services/api";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("role", res.data.role);
setToken(res.data.token);

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login 🔐</h2>

      <form onSubmit={handleLogin} className="form">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;