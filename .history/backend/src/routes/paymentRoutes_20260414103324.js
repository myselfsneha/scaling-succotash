import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

router.post("/create-order", async (req, res) => {
  const order = await rzp.orders.create({
    amount: 50000,
    currency: "INR"
  });

  res.json(order);
});

export default router;