const express = require("express");
const router = express.Router();

const NovelController = require('../../../controllers/novel.controller');

router.use("/all", NovelController.list);
router.use("/detail/:id/", NovelController.getEpisodes);
router.use("/detail/:id/episode", NovelController.getEpisodes);

module.exports = router;