import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
  type: String,
  enum: ["admin", "user"],
  default: "user"
}
  isPremium: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);