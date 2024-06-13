const {test, describe, beforeEach} = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const helper = require("./user_api_helper");
const app = require("../app");
const api = require("supertest")(app);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await helper.resetDbState();
});

describe("testing the login api", () => {
  describe("logging in with a valid user returns a valid jwt", async () => {
    const user = {
      username: "pedro1agito",
      password: "minhasenhalegal123"
    };
    const result = await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);        
    const decodedToken = jwt.verify(result.body.token, process.env.SECRET);
    assert.strictEqual(decodedToken.username, user.username);
  });
});