const BASE_URL = "http://192.168.29.2:5000/api";

export const getStudents = async () => {
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

export const addStudent = async (student: any) => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return res.json();
};

export const updateStudent = async (id: number, student: any) => {
  await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
};

export const deleteStudent = async (id: number) => {
  await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
};