"use strict"

const NovelService = require('../services/novel.service');

class NovelController {
    static list = async (req, res, next) => {
        return NovelService.findAllNovel(req.body);
    }
}

module.exports = NovelController;