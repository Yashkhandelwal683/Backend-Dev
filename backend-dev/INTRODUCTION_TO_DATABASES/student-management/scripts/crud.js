const connectDB = require("../config/db");
const Student = require("../models/Student");

const run = async () => {
  await connectDB();

  const student = await Student.create({
    name: "Yash",
    email: "yash@gmail.com",
    gpa: 3.2,
    city: "Delhi",
    department: "CS"
  });
  console.log("Added:", student);

  const all = await Student.find();
  console.log("All:", all);

  const found = await Student.findOne({ email: "yash@gmail.com" });
  console.log("Found:", found);

  await Student.updateOne({ email: "yash@gmail.com" }, { gpa: 3.8 });
  console.log("Updated");

  await Student.deleteOne({ email: "yash@gmail.com" });
  console.log("Deleted");

  process.exit();
};

run();
