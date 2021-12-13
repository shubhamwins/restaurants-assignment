const express = require("express");

const rstrRoutes = require("./routes/restraunt");
const router = express.Router();
router.use("/restraunt", rstrRoutes);
module.exports = router;