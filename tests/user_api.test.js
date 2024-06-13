const {test, describe, beforeEach} = require("node:test");
const assert = require("node:assert");
const User = require("../models/user");
const helper = require("./user_api_helper");
const app = require("../app");
const api = require("supertest")(app);

beforeEach(async () => {
  await User.deleteMany({});
  const users = helper.initialUsers.map(u => new User(u));
  const promisesArray = users.map(u => u.save());
  await Promise.all(promisesArray);
});

describe("testing the users api", () => {
  describe("geting users", () => {
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
  });
});