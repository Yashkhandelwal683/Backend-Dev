const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  department: String,
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

module.exports = mongoose.model("Course", courseSchema);
