import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import API from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/students");
      setStudents(res.data);
    } catch {
      alert("Error loading");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // ADD / EDIT
  const handleSubmit = async () => {
    if (!name) return alert("Enter name");

    try {
      setLoading(true);

      if (editId) {
        await API.put(`/students/${editId}`, {
          name,
          email: "mobile@test.com",
          course: "App"
        });
        setEditId(null);
      } else {
        await API.post("/students", {
          name,
          email: "mobile@test.com",
          course: "App"
        });
      }

      setName("");
      loadStudents();
    } catch {
      alert("Error saving");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteStudent = async (id) => {
    try {
      setLoading(true);
      await API.delete(`/students/${id}`);
      loadStudents();
    } catch {
      alert("Error deleting");
    } finally {
      setLoading(false);
    }
  };

  // EDIT
  const editStudent = (item) => {
    setName(item.name);
    setEditId(item._id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EduNexus ✨</Text>

      {/* INPUT */}
      <View style={styles.row}>
        <TextInput
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>
            {editId ? "✔" : "+"}
          </Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator color="#00c6ff" />}

      {/* LIST */}
      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInUp.delay(index * 100)}
            style={styles.card}
          >
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.course}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => editStudent(item)}
              >
                <Text style={{ color: "#fff" }}>✏️</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteStudent(item._id)}
              >
                <Text style={{ color: "#fff" }}>🗑</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f2027"
  },

  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 15
  },

  row: {
    flexDirection: "row",
    marginBottom: 15
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 15
  },

  addBtn: {
    marginLeft: 10,
    backgroundColor: "#00c6ff",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center"
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 15,
    borderRadius: 20,
    marginVertical: 6
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },

  sub: {
    color: "#aaa",
    fontSize: 13
  },

  actions: {
    flexDirection: "row"
  },

  editBtn: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    marginRight: 5
  },

  deleteBtn: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 10
  }
};