import { Bar } from "react-chartjs-2";

function Dashboard({ students }) {
  const courseCount = {};

  students.forEach((s) => {
    courseCount[s.course] = (courseCount[s.course] || 0) + 1;
  });

  const data = {
    labels: Object.keys(courseCount),
    datasets: [
      {
        label: "Students per Course",
        data: Object.values(courseCount),
        backgroundColor: "skyblue"
      }
    ]
  };

  return (
    <div>
      <h2>Dashboard 📊</h2>
      <Bar data={data} />
    </div>
  );
}

export default Dashboard;