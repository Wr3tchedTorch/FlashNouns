const mongoose = require("mongoose");

const nounSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["masculine", "feminine", "neuter"],
  },
  group: {
    type: String,
    required: true,
    enum: ["Animals", "Days, Months and Seasons", "Outer Space", "Trees, Fruits and Flowers"]
  }
});

nounSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Noun = new mongoose.model("Noun", nounSchema);

module.exports = Noun;