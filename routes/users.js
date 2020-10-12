const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = express.Router();

const User = require("../models/User");

router.get("/login", (req, res) => res.send("Login Here"));

router.get("/register", (req, res) => res.send("Register New User"));

router.post("/register", (req, res) => {
  console.log(res.body);
  const { name, email, password } = res.body;

  let errors = [];
  User.findOne({ email: email }).then((user) => {
    if (user) {
      errors.push({ msg: "user already exisits" });
      res.render("register", {
        errors,
        name,
        email,
        password,
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.redirect("/login");
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login
router.post("/login", (req, res, next) => {
  // console.log(res);
  passport.authenticate("local", {
    successfulRedirect: "/welcome",
    failureRedirect: "/login",
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
});

module.exports = router;
