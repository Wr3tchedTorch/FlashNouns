const User = require("../models/user");

const initialUsers = [
  {
    username: "ericao123",
    password: "coxinhavencedora",
    score: 0
  },
  {
    username: "pedro1agito",
    password: "minhasenhalegal123",
    score: 10
  },
  {
    username: "lucasnetoofc",
    password: "eusouumafocahurdur",
    score: 123
  },
  {
    username: "HastuMito",
    password: "leagueofdesign123",
    score: 92
  },
  {
    username: "Fernando Pessoa",
    password: "fernandoanimal",
    score: 283
  }
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {usersInDb, initialUsers};