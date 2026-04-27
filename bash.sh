#!/bin/bash

echo "🚀 Creating All Security Projects..."

projects=(
  "project1_ecommerce"
  "project2_social"
  "project3_learning"
  "project4_healthcare"
  "project5_banking"
)

deps="express mongoose dotenv helmet express-session connect-mongo bcryptjs jsonwebtoken express-rate-limit cors validator xss-clean sanitize-html multer"

for project in "${projects[@]}"
do
  echo "📁 Setting up $project"
  
  mkdir $project
  cd $project

  npm init -y
  npm install $deps

  mkdir config controllers models routes middleware utils

  # ------------------ ENV ------------------
  cat <<EOL > .env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/$project
JWT_SECRET=supersecretkey
EOL

  # ------------------ DB ------------------
  cat <<EOL > config/db.js
const mongoose = require("mongoose");
module.exports = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};
EOL

  # ------------------ USER MODEL ------------------
  cat <<EOL > models/User.js
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
EOL

  # ------------------ AUTH CONTROLLER ------------------
  cat <<EOL > controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ email: req.body.email, password: hashed });
  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};
EOL

  # ------------------ AUTH ROUTES ------------------
  cat <<EOL > routes/authRoutes.js
const router = require("express").Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
EOL

  # ------------------ AUTH MIDDLEWARE ------------------
  cat <<EOL > middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("No token");

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};
EOL

  # ------------------ RATE LIMIT ------------------
  cat <<EOL > middleware/rateLimit.js
const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
EOL

  # ------------------ SERVER ------------------
  cat <<EOL > server.js
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(helmet());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 30 }
}));

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => res.send("$project running"));

app.listen(process.env.PORT, () => console.log("Server running"));
EOL

  # ------------------ PROJECT-SPECIFIC ------------------

  if [[ "$project" == "project1_ecommerce" ]]; then
    cat <<EOL > models/Product.js
const mongoose = require("mongoose");

module.exports = mongoose.model("Product", new mongoose.Schema({
  name: String,
  price: { type: Number, min: 0 }
}));
EOL
  fi

  if [[ "$project" == "project2_social" ]]; then
    cat <<EOL > utils/sanitizeHtml.js
const sanitizeHtml = require("sanitize-html");

module.exports = (content) => {
  return sanitizeHtml(content, {
    allowedTags: ["b","i","a"],
    allowedAttributes: { a: ["href"] }
  });
};
EOL
  fi

  if [[ "$project" == "project3_learning" ]]; then
    cat <<EOL > middleware/upload.js
const multer = require("multer");

module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});
EOL
  fi

  if [[ "$project" == "project4_healthcare" ]]; then
    cat <<EOL > middleware/roles.js
module.exports = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send("Forbidden");
  }
  next();
};
EOL
  fi

  if [[ "$project" == "project5_banking" ]]; then
    cat <<EOL > controllers/transaction.js
exports.transfer = (req, res) => {
  const { amount } = req.body;

  if (amount <= 0 || amount > 100000) {
    return res.status(400).send("Invalid amount");
  }

  res.send("Transaction successful");
};
EOL
  fi

  cd ..
done

echo "✅ ALL PROJECTS CREATED SUCCESSFULLY!"
