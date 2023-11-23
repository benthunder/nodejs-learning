"use strict";

const { model, Schema } = require("mongoose");
const fs = require('fs');
const slugify = require('slugify');

const DOCUMENT_NAME = "Novel";
const COLLECTION_NAME = "Novels";

const modelSchema = new Schema({
    name: { type: String, require: true, default: "" },
    slug: { type: String, require: true, default: "" },
    path: { type: String, require: true, default: "" },
    attributes: {
        type: Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true, COLLECTION_NAME });

modelSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    this.path = slugify(this.name, { lower: true });
    next();
})

modelSchema.post('save', function (doc, next) {
    if (!fs.existsSync(`src/storages/${doc.path}-${doc._id}`)) {
        fs.mkdirSync(`src/storages/${doc.path}-${doc._id}`);
    }
    next();
})

modelSchema.methods.getFullPath = function () {
    return `${this.path}-${this._id}`;
}


module.exports = model(DOCUMENT_NAME, modelSchema);