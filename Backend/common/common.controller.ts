import {} from "../questions/questions.service.ts";
import getHeaders from "../utils/getHeaders.ts";
import { searchTopicsAndQuestions } from "./common.service.ts";

function commonHander(req: Request, url: URL) {
  if (url.pathname.includes("search") && req.method === "GET") {
    return searchTopicsAndQuestions(url);
  }

  return new Response(JSON.stringify({ message: "Not Found" }), {
    headers: getHeaders(),
    status: 404,
  });
}

export { commonHander };
