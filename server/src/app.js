import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { LIMIT } from "./constants.js";
import path from "path";

import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import gptRoute from "./routes/gptRoute.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: `${LIMIT}` }));
app.use(express.urlencoded({ extended: true, limit: `${LIMIT}` }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "bleedink", "dist")));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/gpt", gptRoute);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "bleedink", "dist", "index.html"));
});

export default app;
