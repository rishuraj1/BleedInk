import express from "express";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "../db/models/user.models.js";

dotenv.config();

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
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
    });
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  res.send("BleedINK auth route");
});

export default router;
