"use strict";

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "NovelEpisode";
const COLLECTION_NAME = "NovelEpisodes";

const modelSchema = new Schema({
    novel: {
        type: Types.ObjectId,
        required: true,
        ref: "Novel",
    },
    name: { type: String, require: true },
    slug: { type: String, require: true },
    path: { type: String, require: true },
    attributes: {
        type: Schema.Types.Mixed
    }
}, { timestamps: true, COLLECTION_NAME });

module.exports = model(DOCUMENT_NAME, modelSchema);