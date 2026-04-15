import { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import API from "../services/api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/students").then(res => setStudents(res.data));
  }, []);

  const width = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#0f2027" }}>

      <Text style={{ color: "#fff", fontSize: 22 }}>Dashboard</Text>
      <Text style={{ color: "#aaa" }}>Total: {students.length}</Text>

      {global.isPremium && (
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar"],
datasets: [{ data: [5, 10, students.length] }]
          }}
          width={width - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#00c6ff",
            backgroundGradientTo: "#0072ff",
            color: () => "#fff"
          }}
        />
      )}
    </View>
  );
}