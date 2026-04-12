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
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !course) return;

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
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
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

      <TouchableOpacity style={button} onPress={handleSubmit}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          {editingId ? "Update" : "Add"}
        </Text>
      </TouchableOpacity>

      {/* LIST */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={card}>
            <Text>{item.name}</Text>
            <Text>{item.course}</Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={{ color: "blue" }}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={{ color: "red" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const input = {
  borderWidth: 1,
  marginBottom: 8,
  padding: 10,
  borderRadius: 6,
};

const button = {
  backgroundColor: "#007bff",
  padding: 12,
  borderRadius: 6,
  marginBottom: 10,
};

const card = {
  borderWidth: 1,
  padding: 10,
  borderRadius: 8,
  marginBottom: 10,
};