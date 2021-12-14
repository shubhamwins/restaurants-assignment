const express = require("express");

const rstrRoutes = require("./routes/routesRestraunt");
const router = express.Router();
router.use("/restraunt", rstrRoutes);
module.exports = router;