const {test, describe, beforeEach} = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const helper = require("./user_api_helper");
const app = require("../app");
const api = require("supertest")(app);
const bcrypt = require("bcrypt");

beforeEach(async () => {
  helper.resetDbState();
});
describe("testing the users api", () => {
  describe("getting users", () => {
    test("get returns the correct number of users", async () => {
      const result = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(result.body.length, helper.initialUsers.length);
    });
  
    test("get returns users with highest score", async () => {
      const result = await api
        .get("/api/users/topFive")
        .expect(200)
        .expect("Content-Type", /application\/json/);
      const helperResult = await helper.getTopFiveScoreUsers();

      assert.strictEqual(result.body.length, 5);
      assert.deepStrictEqual(result.body.map(u => delete u.id), helperResult.map(u => delete u.password));
    });
  });

  describe("adding new users", () => {
    test("a new user with valid values can be added", async () => {
      const user = {
        username: "Dr Peixes",
        password: "fishingislife",
      };

      const newUser = await api
        .post("/api/users")
        .send(user)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const dbAfter = await helper.usersInDb();
      assert.strictEqual(dbAfter.length, helper.initialUsers.length+1);
            
      user.score = 0;
      delete user.password;
      delete newUser.body.id;
      assert.deepStrictEqual(newUser.body, user);
    });

    describe("respond with status code 400 when adding a user with an already existing username", async () => {
      const user = {
        username: "pedro1agito",
        password: "senhadopedrao"
      };
      const result = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(result.body.error, "expected `username` to be unique");
    });

    describe("respond with status code 400 when adding a username with less than 3 chars", async () => {
      const user = {
        username: "pe",
        password: "senhadopedrao"
      };
      const result = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(result.body.error, "expected `username` length to be at least 3 chars");
    });

    describe("respond with status code 400 when adding a username with more than 16 chars", async () => {
      const user = {
        username: "Immanuel Baaumann",
        password: "umasenhamuitolegal"
      };
      const result = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(result.body.error, "expected `username` length to be lower than 16 chars");
    });
  });
});