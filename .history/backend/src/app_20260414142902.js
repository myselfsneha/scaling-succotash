import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

// DB connect
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;