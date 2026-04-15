import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import API from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const loadStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  useEffect(() => { loadStudents(); }, []);

  const handleAdd = async () => {
    if (global.role === "student") {
      return alert("View only access 🚫");
    }

    if (!global.isPremium && students.length >= 3) {
      return alert("Upgrade required 🚀");
    }

    await API.post("/students", { name });
    setName("");
    loadStudents();
  };

  const deleteStudent = async (id) => {
    if (global.role !== "admin") {
      return alert("Only admin can delete 🚫");
    }

    await API.delete(`/students/${id}`);
    loadStudents();
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>

      {/* ROLE */}
      <Text>Role: {global.role}</Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Search..."
        onChangeText={setSearch}
        style={{ backgroundColor: "#eee", marginBottom: 10 }}
      />

      {/* ADD */}
      {global.role !== "student" && (
        <View style={{ flexDirection: "row" }}>
          <TextInput value={name} onChangeText={setName}
            style={{ flex: 1, backgroundColor: "#fff" }} />

          <TouchableOpacity onPress={handleAdd}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.name}</Text>

            {global.role === "admin" && (
              <TouchableOpacity onPress={() => deleteStudent(item._id)}>
                <Text style={{ color: "red" }}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}