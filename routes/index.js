const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
// home page
router.get("/", (req, res) => res.render("home"));

// welcome after logged in
router.get("/welcome", ensureAuthenticated, (req, res) =>
  res.render("welcome", {
    name: req.user.name,
  })
);

module.exports = router;
