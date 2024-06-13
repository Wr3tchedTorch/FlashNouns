const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: [16, "length must be lower than 16 chars"],
    minLength: [3, "length must be at least 3 chars"]
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