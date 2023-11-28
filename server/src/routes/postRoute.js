import express from "express";
import * as dotenv from "dotenv";

import { Post, Comment } from "../models/post.models.js";
import User from "../models/user.models.js";

import upload from "../middlewares/multer.middleware.js";
import uploadImage from "../utils/cloudinary.js";

dotenv.config();

const router = express.Router();

// Create post
router.route("/create").post(upload.single("thumbnail"), async (req, res) => {
  // console.log(req.file.path, req.body);
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

//get post by id
router.route("/getpost/:postId").get(async (req, res) => {
  try {
    const response = await Post.findById(req.params.postId)
      .populate("createdBy", "username fullname profilePicture")
      .populate("likes", "User");

    const responseComments = await Comment.find({
      _id: { $in: response?.comments },
    })
      .populate("commentedBy", "username fullname profilePicture")
      .sort({ createdAt: -1 });

    // console.log(response);

    res
      .status(200)
      .json({ success: true, post: response, comments: responseComments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//get comment by id
router.route("/getcomment/:commentId").get(async (req, res) => {
  try {
    const response = await Comment.findById(req.params.commentId);
    // console.log(response);

    res.status(200).json({ success: true, comment: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get posts by username
router.route("/getposts/:id").get(async (req, res) => {
  try {
    const response = await Post.find({
      createdBy: req.params.id,
    }).populate("createdBy", "username fullname profilePicture");
    // console.log(response);
    res.status(200).json({ success: true, posts: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// publish or unpublish post
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

//get all public posts for home page
router.route("/getposts").get(async (req, res) => {
  try {
    const response = await Post.find({ isPublic: true })
      .populate("createdBy", "username fullname profilePicture")
      .sort({ updatedAt: -1 });
    console.log(response);
    res.status(200).json({ success: true, posts: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//comment on post
router.route("/comment/:postId").post(async (req, res) => {
  const { userId, comment } = req.body;
  // console.log(req.body);
  try {
    const newComment = await Comment.create({
      content: comment,
      commentedBy: userId,
    });
    const response = await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: newComment?._id },
    });
    const user = User.findById(userId);
    // console.log(newComment);
    // console.log(response);
    // console.log(user);
    res.status(200).json({ success: true, message: "Comment added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete comment by id
router.route("/deletecomment/:commentId").delete(async (req, res) => {
  try {
    const response = await Comment.findByIdAndDelete(req.params.commentId);
    // console.log(response);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete post by id
router.route("/delete/:postId").delete(async (req, res) => {
  try {
    const response = await Post.findByIdAndDelete(req.params.postId);
    // console.log(response);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//add or remove a like
router.route("/like/:userId/:postId").post(async (req, res) => {
  console.log(req.params, req.body);
  try {
    const response = await Post.findById(req.params.postId);
    console.log(response);
    const ifLiked = await response.likes.includes(req.params.userId);
    console.log(ifLiked);
    if (ifLiked) {
      await Post.findByIdAndUpdate(req.params.postId, {
        $pull: { likes: req.params.userId },
      });
      console.log("removed");
      res.status(200).json({ success: true, message: "Like removed" });
    } else {
      await Post.findByIdAndUpdate(req.params.postId, {
        $push: { likes: req.params.userId },
      });
      console.log("added");
      res.status(200).json({ success: true, message: "Like added" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  res.send("Hello from posts");
});

export default router;
