import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 🔥 simple demo login (no backend yet)
    if (email && password) {
      setUser({ email });
    } else {
      alert("Enter email & password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EduNexus 📱</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "#fff" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0f2027"
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 10,
    borderRadius: 12
  },

  button: {
    backgroundColor: "#00c6ff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10
  }
};