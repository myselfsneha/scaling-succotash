import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "http://localhost:5000/api/auth";

  const signup = async () => {
    await fetch(`${API}/signup`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password })
    });
    alert("Signup done");
  };

  const login = async () => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    alert("Login success");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4">Auth</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={signup} className="bg-blue-500 text-white p-2 w-full mb-2">
          Signup
        </button>

        <button onClick={login} className="bg-green-500 text-white p-2 w-full">
          Login
        </button>
      </div>
    </div>
  );
}

export default App;