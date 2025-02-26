import getHeaders from "../utils/getHeaders.ts";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
} from "./questions.service.ts";

function questionsHandler(req: Request, url: URL) {
  if (req.method === "POST") {
    return createQuestion(req);
  }

  if (req.method === "GET") {
    return getQuestions();
  }

  if (req.method === "DELETE") {
    return deleteQuestion(url);
  }

  if (req.method === "PUT") {
    return updateQuestion(req, url);
  }

  return new Response(JSON.stringify({ message: "Not Found" }), {
    headers: getHeaders(),
    status: 404,
  });
}

export { questionsHandler };
