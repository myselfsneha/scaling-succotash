import { protect, adminOnly } from "../middleware/authMiddleware.js";

router.post("/", protect, adminOnly, async (req, res) => {
  const student = new Student(req.body);
  const saved = await student.save();
  res.json(saved);
});