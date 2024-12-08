const express = require("express");
const router = express.Router();
const {
  sayHi
} = require("./notesController");

//say hi 
router.get("/hi", sayHi);

module.exports = router;