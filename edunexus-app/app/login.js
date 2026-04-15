import { useState } from "react";
import { TextInput, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import API from "../services/api";

export default function Login({ setScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password
    });

    console.log(res.data); // 👈 ADD THIS

    global.token = res.data.token;
    global.isPremium = res.data.user.isPremium;

    alert("Login success");
    setScreen("students");

  } catch (err) {
    console.log(err.response?.data || err.message); // 👈 ADD THIS
    alert("Login failed");
  }
};

  return (
    <LinearGradient colors={["#141E30", "#243B55"]}
      style={{ flex: 1, justifyContent: "center", padding: 20 }}>

      <Text style={{ color: "#fff", fontSize: 28 }}>EduNexus 🚀</Text>

      <TextInput placeholder="Email" onChangeText={setEmail}
        style={{ backgroundColor: "#fff", marginTop: 10, padding: 10 }} />

      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword}
        style={{ backgroundColor: "#fff", marginTop: 10, padding: 10 }} />

      <TouchableOpacity onPress={handleLogin}>
        <Text style={{ color: "#00c6ff", marginTop: 20 }}>
          Login
        </Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}