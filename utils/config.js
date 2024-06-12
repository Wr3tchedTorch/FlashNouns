require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.NODE_ENV === "production" ? process.env.MONGODB_URL : process.env.MONGODB_URL_TEST;

module.exports = {PORT, MONGODB_URL};