// routes/pages.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // This tells Express to render the 'views/index.ejs' file
  res.render("index");
});

module.exports = router;
