import express from "express";
import * as dotenv from "dotenv";
import upload from "../middlewares/multer.middleware.js";
import uploadImage from "../utils/cloudinary.js";

import User from "../models/user.models.js";
dotenv.config();

const router = express.Router();

//update cover image
router
  .route("/updateimages/coverimage")
  .post(upload.single("coverPicture"), async (req, res) => {
    const { username } = req.body;
    try {
      const fileURL = await uploadImage(req.file.path);
      const updateCover = await User.findOneAndUpdate(
        {
          username: username,
        },
        {
          coverImage: fileURL,
        },
      );
      console.log(fileURL);
      const updatedUser = await User.findOne({
        username: username,
      });
      console.log(updatedUser, 32);
      res
        .status(200)
        .json({ message: "File uploaded successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//update profile image
router
  .route("/updateimages/profilepicture")
  .post(upload.single("profilePicture"), async (req, res) => {
    const { username } = req.body;
    try {
      const fileURL = await uploadImage(req.file.path);
      const updateProfilePicture = await User.findOneAndUpdate(
        {
          username: username,
        },
        {
          profilePicture: fileURL,
        },
      );
      console.log(fileURL);
      const updatedUser = await User.findOne({
        username: username,
      });
      console.log(updatedUser, 32);
      res
        .status(200)
        .json({ message: "File uploaded successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//update user name or/and bio
router.route("/updateuser").post(async (req, res) => {
  console.log(req.body);
  try {
    const { username, bio, name } = req.body;
    const updateUser = await User.findOneAndUpdate(
      {
        username: username,
      },
      {
        bio: bio,
        fullname: name,
      },
    );
    const updatedUser = await User.findOne({
      username: username,
    });
    console.log(updatedUser, 84);
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  res.send("Hello from dashboard");
});

export default router;
