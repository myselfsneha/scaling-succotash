import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// DB connect
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("DB Error:", err));

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});