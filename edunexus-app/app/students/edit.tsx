import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getStudents, updateStudent } from "../../services/api";

export default function EditStudent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const loadStudent = async () => {
      const students = await getStudents();
      const student = students.find((s) => s.id == id);

      if (student) {
        setName(student.name);
        setEmail(student.email);
        setCourse(student.course);
      }
    };

    loadStudent();
  }, []);

  const handleUpdate = async () => {
    await updateStudent(Number(id), { name, email, course });
    router.back();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Edit Student</Text>

      <TextInput value={name} onChangeText={setName} style={input}/>
      <TextInput value={email} onChangeText={setEmail} style={input}/>
      <TextInput value={course} onChangeText={setCourse} style={input}/>

      <TouchableOpacity style={button} onPress={handleUpdate}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const input = { borderWidth: 1, marginBottom: 10, padding: 10 };
const button = { backgroundColor: "#007bff", padding: 12 };