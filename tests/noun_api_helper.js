const Noun = require("../models/noun");

const initialNouns = [
  {
    name: "Löwe",
    gender: "masculine",
    group: "Animals"
  },
  {
    name: "Katze",
    gender: "feminine",
    group: "Animals"
  },
  {
    name: "Montag",
    gender: "masculine",
    group: "Days, Months and Seasons"
  },
  {
    name: "Mond",
    gender: "masculine",
    group: "Outer Space"
  },
  {
    name: "Eiche",
    gender: "feminine",
    group: "Trees, Fruits and Flowers"
  }
];

const nounsInDb = async () => {
  const nouns = await Noun.find({});
  return nouns.map(n => n.toJSON());
};

module.exports = {nounsInDb, initialNouns};