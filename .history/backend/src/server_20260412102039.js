// src/server.js
import express from "express";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// sample route
app.get("/students", (req, res) => {
  res.json([
    { id: 1, name: "Sneha" },
    { id: 2, name: "John" }
  ]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});