import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { addStudent } from "../../services/api";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const router = useRouter();

  const handleAdd = async () => {
    if (!name || !email || !course) return alert("Fill all fields");

    await addStudent({ name, email, course });
    router.back();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Add Student</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={input}/>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={input}/>
      <TextInput placeholder="Course" value={course} onChangeText={setCourse} style={input}/>

      <TouchableOpacity style={button} onPress={handleAdd}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const input = { borderWidth: 1, marginBottom: 10, padding: 10 };
const button = { backgroundColor: "#28a745", padding: 12 };