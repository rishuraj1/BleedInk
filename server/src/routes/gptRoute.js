import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

import User from "../models/user.models.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

//retrieve asisstant
const assistant = await openai.beta.assistants.retrieve(
  process.env.OPENAI_ASSISTANT_ID,
);

//openai route
router.route("/").post(async (req, res) => {
  console.log(req.body);
  try {
    //check if user has a thread id

    let response;
    const isThread = await User.findById(req.body.userId);
    console.log(isThread?.threads);
    if (!isThread?.threads) {
      //create a new thread
      const thread = await openai.beta.threads.create();
      // update thread id in user model
      await User.findByIdAndUpdate(req.body.userId, {
        threads: thread?.id,
      });

      const message = await openai.beta.threads.messages.create(
        isThread?.threads,
        {
          role: "user",
          content: `${req.body.prompt}`,
        },
      );

      //run asst
      const run = await openai.beta.threads.runs.create(isThread.threads, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID,
        instructions: `Adress the user as ${req.body.name} and answer the following question: ${req.body.prompt}`,
      });

      const runStatus = await openai.beta.threads.runs.retrieve(
        isThread.threads,
        run?.id,
      );

      while (true) {
        const runStatus = await openai.beta.threads.runs.retrieve(
          isThread.threads,
          run?.id,
        );

        if (runStatus?.status === "completed") break;
      }

      const messages = await openai.beta.threads.messages.list(
        isThread.threads,
      );

      response = messages;
    } else {
      // console.log(isThread.threads, 23);
      //create new message
      const message = await openai.beta.threads.messages.create(
        isThread?.threads,
        {
          role: "user",
          content: `${req.body.prompt}`,
        },
      );

      //run asst
      const run = await openai.beta.threads.runs.create(isThread.threads, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID,
        instructions: `Adress the user as ${req.body.name} and answer the following question: ${req.body.prompt} ans continue the conversation`,
      });

      const runStatus = await openai.beta.threads.runs.retrieve(
        isThread.threads,
        run?.id,
      );

      while (true) {
        const runStatus = await openai.beta.threads.runs.retrieve(
          isThread.threads,
          run?.id,
        );

        if (runStatus?.status === "completed") break;
      }

      const messages = await openai.beta.threads.messages.list(
        isThread.threads,
      );

      response = messages?.data[0]?.content[0]?.text?.value;
    }

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
