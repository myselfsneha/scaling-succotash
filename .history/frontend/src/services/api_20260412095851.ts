export type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
};

const BASE_URL = "http://192.168.29.2:5000/api";

export const getStudents = async (): Promise<Student[]> => {
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) throw new Error("Fetch failed");

  const data = await res.json();
  return data.students; // ✅ return array directly
};

export const addStudent = async (student: Omit<Student, "id">) => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  if (!res.ok) throw new Error("Add failed");
  return res.json();
};

export const updateStudent = async (
  id: number,
  student: Omit<Student, "id">
) => {
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