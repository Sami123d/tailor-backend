import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import authRoute from "./routes/auth.js";
import cors from "cors";


const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("common"));
app.use (helmet());
app.use(cors());


app.use("/api/auth", authRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    // code that relies on the MongoDB connection here
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res)=>{
    res.send("welcome")
})

app.listen(port, ()=>{console.log("backend is running")})