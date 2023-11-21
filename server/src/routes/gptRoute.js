import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

import User from "../models/user.models.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

//openai route
router.route("/").post(async (req, res) => {
  console.log(req.body);
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: req.body.prompt,
      max_tokens: 600,
      temperature: 0.9,
      top_p: 1,
      n: 1,
      stream: false,
      user: req.body.user,
    });

    //if not create a new thread
    console.log(response);
    res.status(200).json({ message: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.route("/").get(async (req, res) => res.send("Hello World! from OpenAI"));

export default router;
