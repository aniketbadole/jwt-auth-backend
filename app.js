const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");

const app = express();
app.use(express.json());

// Passport config
require("./config/passport")(passport);

const PORT = 2000;

// DB Config
const db = require("./config/keys").MongoURI;

// Express-Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Mongo Connection
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send(`App is running on ${PORT}`));
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

// Routes
app.use("/", require("./routes/users"));
app.use("/", require("./routes/index"));
