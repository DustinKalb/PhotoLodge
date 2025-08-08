const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    name: { type: String, trim: true, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("folder", folderSchema);