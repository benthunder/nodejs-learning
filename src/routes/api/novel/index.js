const express = require("express");
const router = express.Router();

const NovelController = require('../../../controllers/novel.controller');

router.use("/", NovelController.list);

module.exports = router;