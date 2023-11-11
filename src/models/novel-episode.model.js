"use strict";

const { model, Schema } = require("mongoose");
const fs = require('fs');
const slugify = require('slugify');

const DOCUMENT_NAME = "NovelEpisode";
const COLLECTION_NAME = "NovelEpisodes";

const modelSchema = new Schema({
    novel: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Novel",
    },
    name: { type: String, require: true },
    title: { type: String, default: "" },
    slug: { type: String, require: true, default: "" },
    path: {
        type: String,
        Comment: 'Novel parent path',
    },
    order_priority: {
        Type: Number,
    },
    attributes: {
        type: Schema.Types.Mixed,
        default: {
            translateStatus: "none",
            crawlerStatus: "none"
        }
    }
}, { timestamps: true, COLLECTION_NAME });

modelSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

modelSchema.post('save', async function (doc, next) {
    if (!fs.existsSync(`src/storages/${doc.path}-${doc.novel._id}/chap-${doc.slug}.html`)) {
        fs.writeFileSync(`src/storages/${doc.path}-${doc.novel._id}/chap-${doc.slug}.html`, "Helo chap " + doc._id);
    }
    next();
});

module.exports = model(DOCUMENT_NAME, modelSchema);