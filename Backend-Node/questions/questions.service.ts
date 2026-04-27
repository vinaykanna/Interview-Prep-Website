import { Request, Response } from "express";
import db from "../db";
import sluggify from "../utils/sluggify";

function createQuestion(req: Request, res: Response) {
  try {
    const { name, answer, difficulty = "easy", topic } = req.body;
    const slug = sluggify(name);

    db.prepare(
      "INSERT INTO questions (name, slug, answer, difficulty, topic) VALUES (?, ?, ?, ?, ?)"
    ).run(name, slug, answer, difficulty, topic);

    res.status(201).json({ message: "Created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getQuestions(req: Request, res: Response) {
  try {
    const parent = req.query.topic as string;
    const rows = db
      .prepare("SELECT * FROM questions WHERE topic = ?")
      .all(parent) as any[];

    const result = rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      difficulty: row.difficulty,
      answer: row.answer,
      topic: row.topic,
    }));

    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getAllQuestions(req: Request, res: Response) {
  try {
    const limit = req.query.limit || "10";
    const offset = req.query.offset || "0";

    const countRow = db
      .prepare("SELECT COUNT(*) as count FROM questions")
      .get() as any;
    const count = countRow.count;

    const rows = db
      .prepare("SELECT * FROM questions LIMIT ? OFFSET ?")
      .all(Number(limit), Number(offset)) as any[];

    const result = rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      difficulty: row.difficulty,
      answer: row.answer,
      topic: row.topic,
    }));

    res.json({ total: count, questions: result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getQuestion(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const row = db
      .prepare("SELECT * FROM questions WHERE slug = ?")
      .get(slug) as any;

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
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function deleteQuestion(req: Request, res: Response) {
  try {
    const { id } = req.params;
    db.prepare("DELETE FROM questions WHERE id = ?").run(id);
    res.json({ message: "Deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function updateQuestion(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, answer, topic, difficulty } = req.body;
    const slug = sluggify(name);

    db.prepare(
      "UPDATE questions SET name = ?, answer = ?, difficulty = ?, slug = ?, topic = ? WHERE id = ?"
    ).run(name, answer, difficulty, slug, topic, id);

    res.json({ message: "Updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export {
  createQuestion,
  getQuestions,
  getAllQuestions,
  getQuestion,
  deleteQuestion,
  updateQuestion,
};
