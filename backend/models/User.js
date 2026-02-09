import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "artisan", "admin"],
      default: "customer",
    },

    phone: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false, // for artisan approval by admin
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
