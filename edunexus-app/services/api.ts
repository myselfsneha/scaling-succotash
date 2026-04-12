export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

const BASE_URL = "http://192.168.29.2:5000/api";
export const getStudents = async (): Promise<Student[]> => {
  try {
    const res = await fetch(`${BASE_URL}/students`);
    const data = await res.json();
    return data.students || [];
  } catch (err) {
    console.log("Fetch error:", err);
    return [];
  }
};

export const addStudent = async (student: Omit<Student, "id">) => {
  await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
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