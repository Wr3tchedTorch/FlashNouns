const {test, describe, beforeEach, after} = require("node:test");
const assert = require("node:assert");
const Noun = require("../models/noun");
const helper = require("./noun_api_helper");
const app = require("../app");
const api = require("supertest")(app);
const mongoose = require("mongoose");

beforeEach(async () => {
  await Noun.deleteMany({});
  const nouns = helper.initialNouns.map(n => new Noun(n));
  const promisesArray = nouns.map(n => n.save());
  await Promise.all(promisesArray);
});

describe("testing the nouns api", () => {
  test("getting returns the right nouns", async () => {
    const result = await api
      .get("/api/nouns")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    
    assert.strictEqual(result.body.length, helper.initialNouns.length);
  });
});

after(() => {
  mongoose.connection.close();
});