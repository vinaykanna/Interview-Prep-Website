import getHeaders from "../utils/getHeaders.ts";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
  getQuestion,
} from "./questions.service.ts";

function questionsHandler(req: Request, url: URL) {
  if (req.method === "POST") {
    return createQuestion(req);
  }

  if (req.method === "GET") {
    const QUESTIONS_ROUTE = new URLPattern({ pathname: "/questions" });
    const QUESTION_ROUTE = new URLPattern({ pathname: "/questions/:slug" });
    const QUESTIONS_ROUTE_MATCH = QUESTIONS_ROUTE.exec(req.url);
    const QUESTION_ROUTE_MATCH = QUESTION_ROUTE.exec(req.url);

    if (QUESTION_ROUTE_MATCH) {
      return getQuestion(QUESTION_ROUTE_MATCH.pathname.groups.slug!);
    }

    if (QUESTIONS_ROUTE_MATCH) {
      return getQuestions(url);
    }
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
