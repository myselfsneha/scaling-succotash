type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
};

type StudentsResponse = {
  students: Student[];
};

const BASE_URL = "http://192.168.29.2:5000/api";

export const getStudents = async (): Promise<StudentsResponse> => {
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};