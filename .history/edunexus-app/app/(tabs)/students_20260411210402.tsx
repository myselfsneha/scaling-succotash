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
} from "../../services/api";

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
};

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data.students); // ✅ now TS understands
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

  const handleEdit = (item: Student) => {
    setName(item.name);
    setEmail(item.email);
    setCourse(item.course);
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Students 👨‍🎓
      </Text>

      {/* FORM */}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={input}
      />
      <TextInput
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
        style={input}
      />

      <TouchableOpacity onPress={handleSubmit} style={btn}>
        <Text style={{ color: "#fff" }}>
          {editingId ? "Update" : "Add"}
        </Text>
      </TouchableOpacity>

      {/* LIST */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={card}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.course}</Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={edit} onPress={() => handleEdit(item)}>
                Edit
              </Text>
              <Text style={del} onPress={() => handleDelete(item.id)}>
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