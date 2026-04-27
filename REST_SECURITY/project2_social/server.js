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

app.get("/", (req, res) => res.send("project2_social running"));

app.listen(process.env.PORT, () => console.log("Server running"));
