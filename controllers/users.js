const express = require("express");
const User = require("../models/user");
const userRouter = express.Router();

userRouter
  .get("/", async (req, res) => {
    const users = await User.find({});
    console.log(users);
    res.status(200).json(users);
  });

module.exports = userRouter;