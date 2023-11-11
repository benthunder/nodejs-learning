const express = require("express");
const router = express.Router();
const NovelFactory = require("../../models/factory/novel.factory");
router.get("/", async (req, res, next) => {
    let novelFactory = new NovelFactory({
        name: 'demo-story-6', attributes: {
            'status': 'on-going'
        }
    });

    await novelFactory.save();
    await novelFactory.createWithNewEpisode();
    return res.sendFile('chap-1.html', {
        root: "/workspace/nodejs-learning/src/storages/example/"
    });
})
module.exports = router;