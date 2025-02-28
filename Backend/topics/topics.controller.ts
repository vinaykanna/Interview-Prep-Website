import getHeaders from "../utils/getHeaders.ts";
import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
  getTopicBySlug,
  getAllTopics,
} from "./topics.service.ts";

function topicsHandler(req: Request, url: URL) {
  if (req.method === "POST") {
    return createTopic(req);
  }

  if (req.method === "GET") {
    const TOPICS_ROUTE = new URLPattern({ pathname: "/topics" });
    const ALL_TOPICS_ROUTE = new URLPattern({ pathname: "/topics/all" });
    const TOPICS_ROUTE_MATCH = TOPICS_ROUTE.exec(req.url);
    const ALL_TOPICS_ROUTE_MATCH = ALL_TOPICS_ROUTE.exec(req.url);

    if (ALL_TOPICS_ROUTE_MATCH) {
      return getAllTopics(url);
    }

    if (TOPICS_ROUTE_MATCH) {
      return getTopics(url);
    }
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
