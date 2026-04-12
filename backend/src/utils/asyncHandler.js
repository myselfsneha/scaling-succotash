export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error("🔥 ERROR:", error); // <-- ADD THIS
    res.status(500).json({ message: error.message }); // <-- SHOW REAL ERROR
  }
};