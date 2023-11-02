"use strict";

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Novel";
const COLLECTION_NAME = "Novels";

const modelSchema = new Schema({
    name: { type: String, require: true },
    slug: { type: String, require: true },
    attributes: {
        type: Schema.Types.Mixed
    }
}, { timestamps: true, COLLECTION_NAME });

module.exports = model(DOCUMENT_NAME, modelSchema);