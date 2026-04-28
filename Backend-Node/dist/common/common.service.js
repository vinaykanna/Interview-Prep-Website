"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTopicsAndQuestions = searchTopicsAndQuestions;
exports.uploadAsset = uploadAsset;
exports.getAsset = getAsset;
const db_1 = __importDefault(require("../db"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function searchTopicsAndQuestions(req, res) {
    try {
        const query = req.query.query;
        const result = {
            topics: [],
            questions: [],
        };
        const topics = db_1.default
            .prepare("SELECT * FROM topics WHERE name LIKE ?")
            .all(`%${query}%`);
        const questions = db_1.default
            .prepare("SELECT * FROM questions WHERE name LIKE ?")
            .all(`%${query}%`);
        for (const topic of topics) {
            result.topics.push({
                id: topic.id,
                name: topic.name,
                slug: topic.slug,
            });
        }
        for (const question of questions) {
            result.questions.push({
                id: question.id,
                name: question.name,
                slug: question.slug,
                topic: question.topic,
            });
        }
        res.status(201).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function uploadAsset(req, res) {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        const fileName = (req.file.originalname || "upload").replaceAll(" ", "_");
        const destPath = path_1.default.join(__dirname, "..", "static", fileName);
        // Multer saves to dest with a random name, rename to original
        await promises_1.default.rename(req.file.path, destPath);
        res.status(201).json({
            message: "Uploaded",
            urlPath: `/common/static/${fileName}`,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getAsset(req, res) {
    try {
        const { file } = req.params;
        const filePath = path_1.default.join(__dirname, "..", "static", file);
        res.sendFile(filePath);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
//# sourceMappingURL=common.service.js.map