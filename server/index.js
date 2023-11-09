import express from "express";
import * as dotenv from "dotenv";

import connectDB from "./src/db/connect.js";
import authRoute from "./src/routes/authRoute.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Welcome to BleedINK!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
