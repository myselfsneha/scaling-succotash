import { View, Text, TouchableOpacity } from "react-native";

export default function Settings({ setScreen, darkMode, setDarkMode }) {
  return (
    <View style={{
      flex: 1,
      padding: 20,
      backgroundColor: darkMode ? "#0f2027" : "#fff"
    }}>

      <Text style={{ color: darkMode ? "#fff" : "#000", fontSize: 22 }}>
        Settings
      </Text>

      <TouchableOpacity onPress={() => setDarkMode(!darkMode)}
        style={{ marginTop: 20 }}>
        <Text style={{ color: "#00c6ff" }}>
          Toggle Theme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("profile")}>
        <Text style={{ color: "#00c6ff", marginTop: 20 }}>
          Back
        </Text>
      </TouchableOpacity>

    </View>
  );
}