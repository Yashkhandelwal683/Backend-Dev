const connectDB = require("../config/db");
const Student = require("../models/Student");
const Grade = require("../models/Grade");

const run = async () => {
  await connectDB();

  const avgDept = await Student.aggregate([
    { $group: { _id: "$department", avgGPA: { $avg: "$gpa" } } }
  ]);
  console.log("Avg GPA:", avgDept);

  const popularCourses = await Student.aggregate([
    { $unwind: "$courses" },
    { $group: { _id: "$courses", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  console.log("Popular Courses:", popularCourses);

  const report = await Grade.aggregate([
    {
      $lookup: {
        from: "students",
        localField: "student",
        foreignField: "_id",
        as: "student"
      }
    },
    { $unwind: "$student" },
    {
      $group: {
        _id: "$student.name",
        grades: { $push: "$grade" }
      }
    }
  ]);
  console.log("Report:", report);

  process.exit();
};

run();
