const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: String,
  username: String,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
