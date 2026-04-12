import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getStudents, deleteStudent, Student } from "../../services/api";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Students 👨‍🎓
      </Text>

      {/* ADD BUTTON */}
      <TouchableOpacity
        onPress={() => router.push("/students/add")}
        style={{
          backgroundColor: "#007bff",
          padding: 10,
          borderRadius: 6,
          marginVertical: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          + Add Student
        </Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.course}</Text>

            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/students/edit",
                    params: { id: item.id },
                  })
                }
              >
                <Text style={{ color: "blue", marginRight: 15 }}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await deleteStudent(item.id);
                  fetchStudents();
                }}
              >
                <Text style={{ color: "red" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}