"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionsRouter = void 0;
const express_1 = require("express");
const questions_service_1 = require("./questions.service");
const questionsRouter = (0, express_1.Router)();
exports.questionsRouter = questionsRouter;
questionsRouter.get("/all", questions_service_1.getAllQuestions);
questionsRouter.get("/:slug", questions_service_1.getQuestion);
questionsRouter.get("/", questions_service_1.getQuestions);
questionsRouter.post("/", questions_service_1.createQuestion);
questionsRouter.put("/:id", questions_service_1.updateQuestion);
questionsRouter.delete("/:id", questions_service_1.deleteQuestion);
//# sourceMappingURL=questions.controller.js.map