import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// DB
mongoose.connect("mongodb://127.0.0.1:27017/proDB")
  .then(() => console.log("MongoDB Connected ✅"));

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});