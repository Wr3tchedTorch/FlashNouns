const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter
  .get("/", async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
  })
  .get("/topFive", async (req, res) => {
    const users = await User.find({}).sort("score");    
    res.status(200).json(users.slice(Math.max(users.length-5, 0)));
  })
  .post("/", async (req, res) => {
    const body = req.body;
    const passwordHash = await bcrypt.hash(body.password, 10);

    const user = new User({
      username: body.username,
      password: passwordHash,
      score: body.score | 0
    });
    await user.save();
    res.status(201).json(user);
  });

module.exports = userRouter;