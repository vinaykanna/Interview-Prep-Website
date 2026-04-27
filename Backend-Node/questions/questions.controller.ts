import { Router } from "express";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
  getQuestion,
  getAllQuestions,
} from "./questions.service";

const questionsRouter = Router();

questionsRouter.get("/all", getAllQuestions);
questionsRouter.get("/:slug", getQuestion);
questionsRouter.get("/", getQuestions);
questionsRouter.post("/", createQuestion);
questionsRouter.put("/:id", updateQuestion);
questionsRouter.delete("/:id", deleteQuestion);

export { questionsRouter };
