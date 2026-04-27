import { Request, Response } from "express";
import db from "../db";
import { SearchResultType } from "./common.types";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function searchTopicsAndQuestions(req: Request, res: Response) {
  try {
    const query = req.query.query as string;

    const result: SearchResultType = {
      topics: [],
      questions: [],
    };

    const topics = db
      .prepare("SELECT * FROM topics WHERE name LIKE ?")
      .all(`%${query}%`) as any[];

    const questions = db
      .prepare("SELECT * FROM questions WHERE name LIKE ?")
      .all(`%${query}%`) as any[];

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
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function uploadAsset(req: Request, res: Response) {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const fileName = (req.file.originalname || "upload").replaceAll(" ", "_");
    const destPath = path.join(__dirname, "..", "static", fileName);

    // Multer saves to dest with a random name, rename to original
    await fs.rename(req.file.path, destPath);

    res.status(201).json({
      message: "Uploaded",
      urlPath: `/common/static/${fileName}`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAsset(req: Request, res: Response) {
  try {
    const { file } = req.params;
    const filePath = path.join(__dirname, "..", "static", file);

    res.sendFile(filePath);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { searchTopicsAndQuestions, uploadAsset, getAsset };
