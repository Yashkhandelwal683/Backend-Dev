const mongoose = require("mongoose");

module.exports = mongoose.model("Product", new mongoose.Schema({
  name: String,
  price: { type: Number, min: 0 }
}));
