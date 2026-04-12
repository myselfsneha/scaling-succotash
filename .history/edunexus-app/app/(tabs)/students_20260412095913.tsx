import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  Student,
} from "../../services/api";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchStudents = async () => {
    try {
      const data = await getStudents(); // ✅ already array
      setStudents(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !course) return;

    try {
      if (editingId) {
        await updateStudent(editingId, { name, email, course });
      } else {
        await addStudent({ name, email, course });
      }

      setName("");
      setEmail("");
      setCourse("");
      setEditingId(null);

      fetchStudents();
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Students 👨‍🎓
      </Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={input} />
      <TextInput placeholder="Course" value={course} onChangeText={setCourse} style={input} />

      <TouchableOpacity style={btn} onPress={handleSubmit}>
        <Text style={{ color: "#fff" }}>
          {editingId ? "Update" : "Add"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={card}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.course}</Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={edit} onPress={() => {
                setName(item.name);
                setEmail(item.email);
                setCourse(item.course);
                setEditingId(item.id);
              }}>
                Edit
              </Text>

              <Text style={del} onPress={() => deleteStudent(item.id).then(fetchStudents)}>
                Delete
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const input = {
  borderWidth: 1,
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
};

const btn = {
  backgroundColor: "#007bff",
  padding: 12,
  borderRadius: 8,
  alignItems: "center" as const,
  marginBottom: 10,
};

const card = {
  padding: 12,
  borderWidth: 1,
  borderRadius: 10,
  marginTop: 10,
  backgroundColor: "#f9f9f9",
};

const edit = { color: "blue" };
const del = { color: "red" };