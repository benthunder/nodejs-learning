"use strict"

const NovelService = require('../services/novel.service');
const { OK } = require('../core/response-success.core');
class NovelController {
    static list = async (req, res, next) => {
        let result = await NovelService.findAllNovel(req.body);
        return new OK({
            data: result.data,
            metadata: result.metadata
        }).json(res);
    }
}

module.exports = NovelController;