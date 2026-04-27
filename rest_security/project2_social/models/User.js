const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model("User", schema);
