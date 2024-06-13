const express = require("express");
const app = express();
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/users");

mongoose.connect(config.MONGODB_URL).catch(error => {
  console.log(error);
});

app.use(express.json());
app.use("/api/users", userRouter);
app.use(middleware.errorHandler);

module.exports = app;