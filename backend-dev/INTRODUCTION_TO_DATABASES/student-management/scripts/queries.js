const connectDB = require("../config/db");
const Student = require("../models/Student");

const run = async () => {
  await connectDB();

  const gpaRange = await Student.find({ gpa: { $gte: 3.0, $lte: 3.5 } });
  console.log("GPA Range:", gpaRange);

  const manyCourses = await Student.find({
    $expr: { $gt: [{ $size: "$courses" }, 5] }
  });
  console.log("More than 5 courses:", manyCourses);

  const top = await Student.find().sort({ gpa: -1 }).limit(10);
  console.log("Top 10:", top);

  const countCity = await Student.aggregate([
    { $group: { _id: "$city", count: { $sum: 1 } } }
  ]);
  console.log("City Count:", countCity);

  process.exit();
};

run();
