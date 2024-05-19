import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { userRouter } from "./controller/AuthController.js";
import { ProfileRouter } from "./controller/ProfileController.js";
import { initiativeRouter } from "./controller/Intiativerouter.js";
import { ecoActionRouter } from "./controller/EcoActionController.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://ecobase-v2.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

const db = mongoose.connect(process.env.MONGO_URI);

try {
  if (db) {
    console.log("database connected");
  }
} catch (error) {
  console.log(error);
}

app.use("/auth", userRouter);
app.use("/profile", ProfileRouter);
app.use("/initiative", initiativeRouter);
app.use("/ecoAction", ecoActionRouter);

// Serve static files from the React app's build directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve the index.html file for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log("server at 3000");
});
