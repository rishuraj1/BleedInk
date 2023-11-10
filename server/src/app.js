import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { LIMIT } from "./constants.js";

import authRoute from "./routes/authRoute.js";

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

app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
