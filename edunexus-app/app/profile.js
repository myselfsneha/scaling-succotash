import { View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function Profile({ setScreen }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({});
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0f2027" }}>

      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: image || "https://i.pravatar.cc/150" }}
          style={{ width: 120, height: 120, borderRadius: 60 }} />
      </TouchableOpacity>

      <Text style={{ color: "#fff", marginTop: 10 }}>Sneha Singh</Text>

      <TouchableOpacity onPress={() => setScreen("settings")}>
        <Text style={{ color: "#00c6ff" }}>Settings</Text>
      </TouchableOpacity>

    </View>
  );
}