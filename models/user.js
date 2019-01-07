const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first: String,
  last: String,
  googleId: String,
  githubId: String,
  spotifyId: String,
  spotifyRefresh: String,
  spotifyAccess: String,
  age: String,
  email: String,
  avatar: String
});

const User = mongoose.model("users", userSchema);

module.exports = User;
