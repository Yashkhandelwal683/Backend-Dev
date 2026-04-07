const express = require("express");
const app = express();
// Built-in Middleware
app.use(express.json());

// Logger Middleware
const logger = (req, res, next) => {
  console.log("Method", req.method);
  console.log("URL", req.url);
  next();
};
// Apply Globally
app.use(logger);

// Validation Middleware

const validate = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      msg: "Name is Required",
    });
  }
  next();
};

// Route-specific Middleware

const checkAdmin = (req, res, next)  => {
  // Dummy check (real me DB/JWT se ata h)
  const isAdmin = true;
  if (!isAdmin) {
    return res.status(403).json({
      msg: "Access Denied- Admin only",
    });
  }
  next();
};
// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

// Validation Middlware use
app.post("/user", validate, (req, res) => {
  res.json({
    msg: "User created Successfully",
    data: req.body,
  });
});
// Route Specific Middlware
app.get("/admin", checkAdmin, (req, res) => {
  res.send("Welcome Admin");
});

app.listen(8080, () => console.log("Server Started"));
