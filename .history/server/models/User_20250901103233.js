import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    password: { type: String, required: true, select: false }, 
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: String,
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = function matchPassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
