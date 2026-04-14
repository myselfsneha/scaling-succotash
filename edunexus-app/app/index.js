import { useState } from "react";
import Login from "./login";
import Students from "./students";

export default function Home() {
  const [user, setUser] = useState(null);

  // 🔐 If not logged in → show login
  if (!user) {
    return <Login setUser={setUser} />;
  }

  // ✅ After login → show students screen
  return <Students />;
}