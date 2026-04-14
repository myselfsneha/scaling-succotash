import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import api from "../services/api";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  // 🔥 GET students
  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✏️ input handler
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // ➕ ADD student
  const addStudent = async () => {
    try {
      await api.post("/students", form);
      fetchStudents();
      setForm({ name: "", email: "", course: "" });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Manager 📱</Text>

      {/* FORM */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(val) => handleChange("name", val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(val) => handleChange("email", val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Course"
        value={form.course}
        onChangeText={(val) => handleChange("course", val)}
      />

      <Button title="Add Student" onPress={addStudent} />

      {/* LIST */}
      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.course}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  card: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5
  }
});
