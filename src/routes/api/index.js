const express = require("express");
const router = express.Router();

router.use("/novel", require("./novel"));

module.exports = router;