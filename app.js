const express = require("express");
const app = express();
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const cors = require("cors");

const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const nounsRouter = require("./controllers/nouns");

mongoose.connect(config.MONGODB_URL).catch(error => {
  console.log(error);
});

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/nouns", nounsRouter);
app.use(middleware.errorHandler);

module.exports = app;