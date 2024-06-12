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
  test("get returns the correct number of users", async () => {
    const result = await api.get("/api/users").expect(200).expect("Content-Type", /application\/json/);
    console.log(result.body);
    assert.strictEqual(result.body.length, helper.initialUsers.length);
  });

  test("get returns users with highest score", () => {

  });
});