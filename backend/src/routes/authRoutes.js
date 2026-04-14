import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const user = {
    id: "123",
    role: "admin" // change to "user" to test
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token, role: user.role });
});

export default router;