import express from "express";

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// sample route
app.get("/students", (req, res) => {
  res.json([
    { id: 1, name: "Sneha" },
    { id: 2, name: "Oshi" }
  ]);
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});