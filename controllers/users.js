const express = require("express");
const User = require("../models/user");
const userRouter = express.Router();

userRouter
  .get("/", async (req, res) => {
    const users = await User.find({});
    console.log(users);
    res.status(200).json(users);
  })
  .get("/topFive", async (req, res) => {
    const users = await User.find({}).sort("score");    
    res.status(200).json(users.slice(Math.max(users.length-5, 0)));
  });

module.exports = userRouter;