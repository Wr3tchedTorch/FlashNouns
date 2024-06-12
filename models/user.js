const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLenght: 16
  },
  password: {
    type: String,
    required: true,    
  },
  score: Number
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;