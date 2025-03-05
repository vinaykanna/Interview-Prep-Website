import getHeaders from "../utils/getHeaders.ts";
import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
} from "./topics.service.ts";

function topicsHandler(req: Request, url: URL) {
  if (req.method === "POST") {
    return createTopic(req);
  }

  if (req.method === "GET") {
    return getTopics(url);
  }

  if (req.method === "DELETE") {
    return deleteTopic(url);
  }

  if (req.method === "PUT") {
    return updateTopic(req, url);
  }

  return new Response(JSON.stringify({ message: "Not Found" }), {
    headers: getHeaders(),
    status: 404,
  });
}

export { topicsHandler };
