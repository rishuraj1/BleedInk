import express from "express";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "../db/models/user.models.js";

dotenv.config();

const router = express.Router();

router.route("/register").post(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  try {
    const search = await User.findOne({ email });
    if (search)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePicture: "",
    });
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!passwordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    res.status(200).json({
      success: true,
      data: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  res.send("BleedINK auth route");
});

export default router;
