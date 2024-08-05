// "name": name,
//       "email": email,
//       "password": password,
//       "contact": contact

import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    
    role: {
      type: String,
      default: "User",
    },
  },
  { timestamps: true }
);

export default model("User", UserSchema);
