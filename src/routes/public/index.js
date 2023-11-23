const express = require("express");
const router = express.Router();
const { NovelController } = require('../../controllers/novel.controller');

router.get("/", NovelController.list)
router.get("/novel/:id", NovelController.detail)

module.exports = router;