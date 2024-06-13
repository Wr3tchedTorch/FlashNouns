const express = require("express");
const nounsRouter = express.Router();
const Noun = require("../models/noun");

let previousIndex = Number.MAX_SAFE_INTEGER;
const getRandomIndex = (length) => {
  let index = Math.floor(Math.random() * (length-1));
  if (previousIndex === index) return getRandomIndex(length);

  previousIndex = index;
  return index;
};

nounsRouter
  .get("/", async (req, res) => {
    const nouns = await Noun.find({});
    res.status(200).json(nouns);
  })
  .get("/randomNoun", async (req, res) => {
    const nouns = await Noun.find({});            
    const randomIndex = getRandomIndex(nouns.length);
    console.log(randomIndex);
    res.status(200).json(nouns[randomIndex]);
  })
  .post("/", async (req, res) => {
    const body = req.body;
    const noun = new Noun({
      name: body.name,
      gender: body.gender,
      group: body.group
    });
    await noun.save();
    res.status(201).json(noun);
  });

module.exports = nounsRouter;