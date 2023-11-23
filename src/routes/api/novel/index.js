const express = require("express");
const router = express.Router();

const { NovelControllerAPI } = require('../../../controllers/novel.controller');

router.use("/all", NovelControllerAPI.list);
router.use("/detail/:id/", NovelControllerAPI.getEpisodes);
router.use("/detail/:id/episode", NovelControllerAPI.getEpisodes);

module.exports = router;