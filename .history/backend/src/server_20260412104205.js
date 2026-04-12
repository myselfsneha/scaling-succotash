import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const PORT = 5000;

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/students", studentRoutes);

// test
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});