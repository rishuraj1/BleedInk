import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String, // we will hash it before saving it to the database
      required: [true, "Password is required"],
    },
    profilePicture: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    followers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: false,
      },
    ],
    threads: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.userExists = async function (username, email) {
  const user = await this.model("User").findOne({
    $or: [{ username }, { email }],
  });

  if (this.username === username) return "Username already exists";
  if (this.email === email) return "Email already exists";
  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
