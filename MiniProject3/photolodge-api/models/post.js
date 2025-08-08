const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: "folder" },
    title: { type: String, trim: true, required: true },
    tags: { type: [String], set: tags => [...new Set(tags.map(tag => tag.toLowerCase().trim()))] },
    description: { type: String, trim: true },
    imageUrl: { type: String, trim: true, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", postSchema);