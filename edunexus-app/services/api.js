const BASE_URL = "http://192.168.29.2:5000/api";

export const getStudents = async () => {
  const res = await fetch(`${BASE_URL}/students`);
  return res.json();
};

export const addStudent = async (student) => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  return res.json();
};