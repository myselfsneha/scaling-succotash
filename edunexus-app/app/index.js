import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import Login from "./login";
import Students from "./students";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Settings from "./settings";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View style={{ flex: 1 }}>

      <Animated.View entering={FadeIn.duration(400)} style={{ flex: 1 }}>
        {screen === "login" && <Login setScreen={setScreen} />}
        {screen === "students" && <Students darkMode={darkMode} />}
        {screen === "dashboard" && <Dashboard darkMode={darkMode} />}
        {screen === "profile" && <Profile setScreen={setScreen} />}
        {screen === "settings" && (
          <Settings
            setScreen={setScreen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}
      </Animated.View>

      {screen !== "login" && screen !== "settings" && (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 15,
          backgroundColor: "#111"
        }}>
          <TouchableOpacity onPress={() => setScreen("students")}>
            <Text style={{ color: "#fff" }}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen("dashboard")}>
            <Text style={{ color: "#fff" }}>📊</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen("profile")}>
            <Text style={{ color: "#fff" }}>👤</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}