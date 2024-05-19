import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./controller/AuthController.js";
import { ProfileRouter } from "./controller/ProfileController.js";
import { initiativeRouter } from "./controller/Intiativerouter.js";
import { ecoActionRouter } from "./controller/EcoActionController.js";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials : true
  })  
);


const db = mongoose.connect(process.env.MONGO_URI);

try {
  if (db) {
    console.log("database connected");
  }
} catch (error) {
  console.log(error);
}
app.use(express.json());
app.use("/auth", userRouter);
app.use("/profile", ProfileRouter);
app.use("/initiative", initiativeRouter);
app.use("/ecoAction", ecoActionRouter);



app.listen(3000, (req, res) => {
  console.log("server at 3000");
});
