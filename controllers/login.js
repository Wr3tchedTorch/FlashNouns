const express = require("express");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

loginRouter
  .post("/", async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});    
    console.log(user);
    console.log(await bcrypt.compare(password, user.password));
    const passwordIsValid = user === null ? false : await bcrypt.compare(password, user.password);    
    if (!passwordIsValid || !user) {
      return res.status(401).json({error: "invalid username or password"});
    }
    
    const userForToken = {
      username: user.username,
      id: user._id
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).json({token, username: user.username});
  });

module.exports = loginRouter;