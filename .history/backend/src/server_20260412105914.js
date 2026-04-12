import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// ENV
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// DB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});