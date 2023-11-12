import express from "express";
import * as dotenv from "dotenv";

import Post from "../models/post.models.js";
import User from "../models/user.models.js";

import upload from "../middlewares/multer.middleware.js";
import uploadImage from "../utils/cloudinary.js";

dotenv.config();

const router = express.Router();

// Create post
router.route("/create").post(upload.single("thumbnail"), async (req, res) => {
  console.log(req.file.path, req.body);
  const { title, content, userId } = req.body;
  try {
    const thumbnailURL = await uploadImage(req.file.path);
    console.log(thumbnailURL);

    const newPost = await Post.create({
      title,
      content,
      createdBy: userId,
      thumbnail: thumbnailURL,
    });

    console.log(newPost);

    const updateUser = await User.findByIdAndUpdate(userId, {
      $push: { posts: newPost._id },
    });

    console.log(updateUser);
    res
      .status(200)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  res.send("Hello from posts");
});

export default router;
