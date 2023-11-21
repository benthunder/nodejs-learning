const express = require("express");
const router = express.Router();

const NovelController = require('../../../controllers/novel.controller');

router.use("/all", NovelController.list);
router.use("/detail/:id/", NovelController.list);
router.use("/detail/:id/episode", NovelController.list);

module.exports = router;