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
    res.status(200).json({ success: true, message: "Post created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get posts by username
router.route("/getposts/:id").get(async (req, res) => {
  try {
    const response = await Post.find({
      createdBy: req.params.id,
    }).populate("createdBy", "username fullname profilePicture");
    console.log(response);
    res.status(200).json({ success: true, posts: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/publish/:id").post(async (req, res) => {
  // console.log(req.params.id);
  // console.log(req.body);
  try {
    const response = await Post.findByIdAndUpdate(req.params.id, {
      isPublic: !req.body.isPublic,
    });
    // console.log(response?.isPublic);
    if (!response?.isPublic) {
      res.status(200).json({ success: true, message: "Post published" });
    } else {
      res.status(201).json({ success: true, message: "Post unpublished" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  res.send("Hello from posts");
});

export default router;
