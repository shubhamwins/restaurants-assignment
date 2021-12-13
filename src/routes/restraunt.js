const express = require("express");

const { addRestraunt } = require("../services/restraunt");

const router = express.Router();
router.post("/add", addRestraunt);
module.exports = router;