import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String, // we will hash it before saving it to the database
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  followers: {
    type: Array,
    required: false,
  },
  following: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
