const NovelModel = require("../models/novel.model");
const NovelEpisodeModel = require("../models/novel-episode.model");
const fs = require('fs');

class NovelService {
    static async createNewWithEpisode(
        novelData = { name: "", attributes: {} },
        episodeData = { name: "Introdution", attributes: {} }
    ) {
        let newNovel = await NovelModel(novelData).save();

        episodeData.path = newNovel.path;
        episodeData.novel = newNovel._id;
        let newNovelEpisode = await NovelEpisodeModel(episodeData).save();

        return {
            novel: newNovel,
            novelEpisode: newNovelEpisode
        }
    }

    static async create(
        novelData = { name: "", attributes: {} }
    ) {
        let newNovel = await NovelModel(novelData).save();

        return newNovel;
    }

    static async assignNewEpisode(novel_id, episodeData = { name: "", path: "", novel: null }) {
        let novelFound = await NovelEpisodeModel.findOne({ name: episodeData.name, novel: novel_id }).lean();
        if (novelFound) {
            return novelFound;
        }

        let newNovelEpisode = await NovelEpisodeModel({ ...episodeData, novel: novel_id }).save();
        return newNovelEpisode;
    }

    static async updateContentForEpisode(eposiode, content) {
        let path = `src/storages/${eposiode.path}-${eposiode.novel._id}/chap-${eposiode.slug}.html`;
        await fs.writeFileSync(path, content);
        eposiode.attributes['crawlerStatus'] = 'done';
        await NovelEpisodeModel.updateOne({ _id: eposiode._id }, eposiode);
        return eposiode;
    }

    static async getAllEpisode(novel_id, episodeData = {}) {
        if (!novel_id) {
            throw new Error("Invalid novel");
        }

        let novelEpisodes = await NovelEpisodeModel.find({ ...episodeData, novel: novel_id }).sort({ name: 1 }).collation({ locale: "vi", numericOrdering: true });
        return novelEpisodes;
    };


    static async getNextEpisode({ novel_id, episode_id }) {
        if (!novel_id || !episode_id) {
            throw new Error("Invalid chaper");
        }
    };
    static async getPrevEpisode({ novel_id, episode_id }) {
        if (!novel_id || !episode_id) {
            throw new Error("Invalid chaper");
        }
    };
    static async getEpisode({ novel_id, episode_id }) {
        if (!novel_id || !episode_id) {
            throw new Error("Invalid chaper");
        }
    };

    static async findAllNovel({ query = {}, limit = 50, skip = 0, sort = { update_at: -1 } }) {
        return await NovelModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();
    }
}

module.exports = NovelService;