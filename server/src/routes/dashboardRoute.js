import express from "express";
import * as dotenv from "dotenv";

import User from "../models/user.models.js";

const router = express.Router();

//get user details
router.route("/getuser").post(async (req, res) => {
  const { username } = req.body;
  // console.log(req.body);
  // console.log(username);
  try {
    const userDetails = await User.findOne({ username });
    // console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  res.send("Hello from dashboard");
});

export default router;
