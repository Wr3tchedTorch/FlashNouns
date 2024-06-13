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

  describe("adding a new noun", () => {
    test("adding noun with valid values", async () => {
      const noun = {
        name: "Bär",
        gender: "masculine",
        group: "Animals"
      };
      const result = await api
        .post("/api/nouns")
        .send(noun)
        .expect(201)
        .expect("Content-Type", /application\/json/);
  
      const nounsInDbAfter = await helper.nounsInDb();
      assert.strictEqual(nounsInDbAfter.length, helper.initialNouns.length+1);
      delete result.body.id;
      assert.deepStrictEqual(result.body, noun);
    });
  
    test("adding noun with invalid group", async () => {
      const noun = {
        name: "Bär",
        gender: "masculine",
        group: "invalidgroup"
      };
      const result = await api
        .post("/api/nouns")
        .send(noun)
        .expect(400)
        .expect("Content-Type", /application\/json/);
  
      const nounsInDbAfter = await helper.nounsInDb();
      assert.strictEqual(nounsInDbAfter.length, helper.initialNouns.length);
      delete result.body.id;
      assert.deepStrictEqual(result.body, {error: "Noun Validation Failed: the value is not a valid noun group"});
    });

    test("adding noun with empty group", async () => {
      const noun = {
        name: "Bär",
        gender: "masculine",
      };
      const result = await api
        .post("/api/nouns")
        .send(noun)
        .expect(400)
        .expect("Content-Type", /application\/json/);
  
      const nounsInDbAfter = await helper.nounsInDb();
      assert.strictEqual(nounsInDbAfter.length, helper.initialNouns.length);
      delete result.body.id;
      assert.deepStrictEqual(result.body, {error: "Noun Validation Failed: the value is not a valid noun group"});
    });
  
    test("adding noun with invalid gender", async () => {
      const noun = {
        name: "Bär",
        gender: "invalidgender",
        group: "animals"
      };
      const result = await api
        .post("/api/nouns")
        .send(noun)
        .expect(400)
        .expect("Content-Type", /application\/json/);
  
      const nounsInDbAfter = await helper.nounsInDb();
      assert.strictEqual(nounsInDbAfter.length, helper.initialNouns.length);
      delete result.body.id;
      assert.deepStrictEqual(result.body, {error: "Noun Validation Failed: the value is not a valid noun gender"});
    });

    test("adding noun with empty gender", async () => {
      const noun = {
        name: "Bär",
        group: "animals"
      };
      const result = await api
        .post("/api/nouns")
        .send(noun)
        .expect(400)
        .expect("Content-Type", /application\/json/);
  
      const nounsInDbAfter = await helper.nounsInDb();
      assert.strictEqual(nounsInDbAfter.length, helper.initialNouns.length);
      delete result.body.id;
      assert.deepStrictEqual(result.body, {error: "Noun Validation Failed: the value is not a valid noun gender"});
    });
  });
});

after(() => {
  mongoose.connection.close();
});