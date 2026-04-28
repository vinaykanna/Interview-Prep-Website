"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTopic = createTopic;
exports.getTopics = getTopics;
exports.deleteTopic = deleteTopic;
exports.updateTopic = updateTopic;
const db_1 = __importDefault(require("../db"));
const sluggify_1 = __importDefault(require("../utils/sluggify"));
function createTopic(req, res) {
    try {
        const { name, description, parent } = req.body;
        const slug = parent ? `${parent}-${(0, sluggify_1.default)(name)}` : (0, sluggify_1.default)(name);
        db_1.default.prepare("INSERT INTO topics (name, slug, description, parent) VALUES (?, ?, ?, ?)").run(name, slug, description, parent);
        res.status(201).json({ message: "Created" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
function getTopics(_req, res) {
    try {
        const query = `
        SELECT 
          t.id,
          t.name,
          t.slug,
          t.description,
          t.parent,
          p.name as parent_name,
          t.created_at,
          t.updated_at
        FROM topics t
        LEFT JOIN topics p
        ON t.parent = p.slug
      `;
        const rows = db_1.default.prepare(query).all();
        const topics = rows.map((row) => ({
            id: row.id,
            name: row.name,
            slug: row.slug,
            description: row.description,
            parent: row.parent,
            parentName: row.parent_name,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
        res.json(topics);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
function deleteTopic(req, res) {
    try {
        const { id } = req.params;
        db_1.default.prepare("DELETE FROM topics WHERE id = ?").run(id);
        res.json({ message: "Deleted" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
function updateTopic(req, res) {
    try {
        const { id } = req.params;
        const { name, description, parent } = req.body;
        const slug = parent ? `${parent}-${(0, sluggify_1.default)(name)}` : (0, sluggify_1.default)(name);
        db_1.default.prepare(`UPDATE topics SET
       name = ?,
       slug = ?,
       description = ?,
       parent = ?,
       updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(name, slug, description, parent, id);
        res.json({ message: "Updated" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
//# sourceMappingURL=topics.service.js.map