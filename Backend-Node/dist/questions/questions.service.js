"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestion = createQuestion;
exports.getQuestions = getQuestions;
exports.getAllQuestions = getAllQuestions;
exports.getQuestion = getQuestion;
exports.deleteQuestion = deleteQuestion;
exports.updateQuestion = updateQuestion;
const db_1 = __importDefault(require("../db"));
const sluggify_1 = __importDefault(require("../utils/sluggify"));
function createQuestion(req, res) {
    try {
        const { name, answer, difficulty = "easy", topic } = req.body;
        const slug = (0, sluggify_1.default)(name);
        db_1.default.prepare("INSERT INTO questions (name, slug, answer, difficulty, topic) VALUES (?, ?, ?, ?, ?)").run(name, slug, answer, difficulty, topic);
        res.status(201).json({ message: "Created" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
function getQuestions(req, res) {
    try {
        const parent = req.query.topic;
        const rows = db_1.default
            .prepare("SELECT * FROM questions WHERE topic = ?")
            .all(parent);
        const result = rows.map((row) => ({
            id: row.id,
            name: row.name,
            slug: row.slug,
            difficulty: row.difficulty,
            answer: row.answer,
            topic: row.topic,
        }));
        res.json(result);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
function getAllQuestions(req, res) {
    try {
        const limit = req.query.limit || "10";
        const offset = req.query.offset || "0";
        const countRow = db_1.default
            .prepare("SELECT COUNT(*) as count FROM questions")
            .get();
        const count = countRow.count;
        const rows = db_1.default
            .prepare("SELECT * FROM questions LIMIT ? OFFSET ?")
            .all(Number(limit), Number(offset));
        const result = rows.map((row) => ({
            id: row.id,
            name: row.name,
            slug: row.slug,
            difficulty: row.difficulty,
            answer: row.answer,
            topic: row.topic,
        }));
        res.json({ total: count, questions: result });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
function getQuestion(req, res) {
    try {
        const { slug } = req.params;
        const row = db_1.default
            .prepare("SELECT * FROM questions WHERE slug = ?")
            .get(slug);
        const result = row
            ? {
                id: row.id,
                name: row.name,
                slug: row.slug,
                answer: row.answer,
                difficulty: row.difficulty,
                topic: row.topic,
            }
            : {};
        res.json(result);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
function deleteQuestion(req, res) {
    try {
        const { id } = req.params;
        db_1.default.prepare("DELETE FROM questions WHERE id = ?").run(id);
        res.json({ message: "Deleted" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
function updateQuestion(req, res) {
    try {
        const { id } = req.params;
        const { name, answer, topic, difficulty } = req.body;
        const slug = (0, sluggify_1.default)(name);
        db_1.default.prepare("UPDATE questions SET name = ?, answer = ?, difficulty = ?, slug = ?, topic = ? WHERE id = ?").run(name, answer, difficulty, slug, topic, id);
        res.json({ message: "Updated" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
//# sourceMappingURL=questions.service.js.map