const NovelModel = require("../novel.model");
const NovelEpisodeModel = require("../novel-episode.model");

class NovelFactory {
    constructor({ name, slug, path, attributes }) {
        this.name = name;
        this.slug = slug;
        this.path = path;
        this.attributes = attributes;
    }

    async save() {
        let novel = new NovelModel({ ...this });
        await novel.save();

        if (!novel) {
            throw new Error("Can not create novel");
        }

        this._id = novel._id;
        this.path = novel.path;
        return this;
    }

    async createWithNewEpisode() {
        if (!this._id) {
            throw new Error("Can not create episode for this novel");
        }

        let novelEpisode = await NovelEpisodeModel.findOne({ novel: this._id });

        if (novelEpisode) {
            throw new Error("Novel episode already exists");
        }

        novelEpisode = new NovelEpisodeModel({
            novel: this._id,
            name: 'Introduction',
            order_priority: 0,
            path: this.path
        });

        await novelEpisode.save();
        return this;
    }
}

module.exports = NovelFactory;