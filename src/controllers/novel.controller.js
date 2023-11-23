"use strict"

const NovelService = require('../services/novel.service');
const { OK } = require('../core/response-success.core');
class NovelController {
    static list = async (req, res, next) => {
        let { data, metadata } = await NovelService.findAllNovel(req.body);
        console.log(data, metadata);
        res.render("home.html", { title: "Novel online", data, metadata });
    }

    static detail = async (req, res, next) => {
        let novelId = req.params.id;

        let novel = await NovelService.findById(novelId);

        if (req.body.query) {
            req.body.query = { ...req.body.query, novel: novelId }
        } else {
            req.body.query = { novel: novelId }
        }

        req.body.populate = "-_id title slug path url";
        let { data, metadata } = await NovelService.findAllEpisode(req.body);
        res.render("detail.html", { title: novel.name, data, metadata });
    }
}

class NovelControllerAPI {
    static list = async (req, res, next) => {
        let { data, metadata } = await NovelService.findAllNovel(req.body);
        return new OK({
            data, metadata
        }).json(res);
    }

    static getEpisodes = async (req, res, next) => {
        let novelId = req.params.id;
        if (req.body.query) {
            req.body.query = { ...req.body.query, novel: novelId }
        } else {
            req.body.query = { novel: novelId }
        }
        let { data, metadata } = await NovelService.findAllEpisode(req.body);
        return new OK({
            data, metadata
        }).json(res);
    }
}

module.exports = {
    NovelController: NovelController,
    NovelControllerAPI: NovelControllerAPI
};