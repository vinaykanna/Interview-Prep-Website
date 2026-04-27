import { Request, Response } from "express";
import db from "../db";
import sluggify from "../utils/sluggify";

function createTopic(req: Request, res: Response) {
  try {
    const { name, description, parent } = req.body;
    const slug = parent ? `${parent}-${sluggify(name)}` : sluggify(name);

    db.prepare(
      "INSERT INTO topics (name, slug, description, parent) VALUES (?, ?, ?, ?)"
    ).run(name, slug, description, parent);

    res.status(201).json({ message: "Created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getTopics(_req: Request, res: Response) {
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

    const rows = db.prepare(query).all() as any[];

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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

function deleteTopic(req: Request, res: Response) {
  try {
    const { id } = req.params;
    db.prepare("DELETE FROM topics WHERE id = ?").run(id);
    res.json({ message: "Deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function updateTopic(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, description, parent } = req.body;
    const slug = parent ? `${parent}-${sluggify(name)}` : sluggify(name);

    db.prepare(
      `UPDATE topics SET
       name = ?,
       slug = ?,
       description = ?,
       parent = ?,
       updated_at = CURRENT_TIMESTAMP WHERE id = ?`
    ).run(name, slug, description, parent, id);

    res.json({ message: "Updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { createTopic, getTopics, deleteTopic, updateTopic };
