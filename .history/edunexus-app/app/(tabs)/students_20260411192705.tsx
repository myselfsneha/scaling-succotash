import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

const BASE_URL = "http://192.168.29.2:5000/api";

// ✅ TYPE FIX
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
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // 🔹 FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/students`);
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔹 ADD / UPDATE
  const handleSubmit = async () => {
    if (!name || !email || !course) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        // UPDATE
        await fetch(`${BASE_URL}/students/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, course }),
        });
      } else {
        // ADD
        await fetch(`${BASE_URL}/students`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, course }),
        });
      }

      // RESET
      setName("");
      setEmail("");
      setCourse("");
      setEditingId(null);

      fetchStudents();
    } catch (err) {
      console.log("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DELETE
  const handleDelete = async (id: number) => {
    try {
      await fetch(`${BASE_URL}/students/${id}`, {
        method: "DELETE",
      });
      fetchStudents();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // 🔹 EDIT
  const handleEdit = (item: Student) => {
    setName(item.name);
    setEmail(item.email);
    setCourse(item.course);
    setEditingId(item.id);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Students Manager 🚀
      </Text>

      {/* FORM */}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 5, padding: 8 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 5, padding: 8 }}
      />

      <TextInput
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button
        title={editingId ? "Update Student" : "Add Student"}
        onPress={handleSubmit}
      />

      {/* LOADING */}
      {loading && <Text style={{ marginTop: 10 }}>Loading...</Text>}

      {/* LIST */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.course}</Text>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 5 }}>
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