import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard({ students }) {
  // group by course
  const data = Object.values(
    students.reduce((acc, s) => {
      if (!acc[s.course]) {
        acc[s.course] = { course: s.course, count: 0 };
      }
      acc[s.course].count++;
      return acc;
    }, {})
  );

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2>Dashboard 📊</h2>

      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#00c6ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;