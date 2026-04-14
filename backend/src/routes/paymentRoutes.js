import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/fake-success", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (user) {
      user.isPremium = true;
      await user.save();
    }

    res.json({ message: "Premium activated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;