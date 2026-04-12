import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: 2003, // your mysql password
  database: "student_management",
});