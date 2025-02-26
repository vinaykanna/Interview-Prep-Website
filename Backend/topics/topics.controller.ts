import getHeaders from "../utils/getHeaders.ts";
import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
  getTopicBySlug,
} from "./topics.service.ts";

function topicsHandler(req: Request, url: URL) {
  if (req.method === "POST") {
    return createTopic(req);
  }

  if (req.method === "GET") {
    const TOPICS_ROUTE = new URLPattern({ pathname: "/topics" });
    const TOPIC_ROUTE = new URLPattern({ pathname: "/topics/:slug" });
    const TOPICS_ROUTE_MATCH = TOPICS_ROUTE.exec(req.url);
    const TOPIC_ROUTE_MATCH = TOPIC_ROUTE.exec(req.url);

    if (TOPICS_ROUTE_MATCH) {
      return getTopics(url);
    }

    if (TOPIC_ROUTE.exec(req.url)) {
      return getTopicBySlug(TOPIC_ROUTE_MATCH?.pathname.groups.slug!);
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
