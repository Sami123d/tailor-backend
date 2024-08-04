import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const Router = express.Router();
import cors from "cors";


const app = express();
app.use(cors());

Router.post("/register", async (req, res) => {
  try {
    //GENERATE NEW PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    // SAVE USER and RETURN
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// // LOGIN
Router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    res.status(200).json(user);
  } catch (Err) {
    res.status(500).json({ message: "Server error" });
  }
});


// FORGOT PASSWORD
Router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("user found", user.password, user.name);
    if (!user) {
      res.status(300).json("user not found");
    }
    const newPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.save();
    res.status(200).json("password updated successfully");
  } catch (err) {
    res.status(300).json(err);
  }
});

export default Router;
