const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first: String,
  last: String,
  googleId: String,
  age: String,
  email: String
});

const User = mongoose.model("users", userSchema);

module.exports = User;
