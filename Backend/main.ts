import { commonHander } from "./common/common.controller.ts";
import { questionsHandler } from "./questions/questions.controller.ts";
import { topicsHandler } from "./topics/topics.controller.ts";
import getHeaders from "./utils/getHeaders.ts";

Deno.serve({ port: 3000 }, (_req) => {
  const url = new URL(_req.url);

  if (url.pathname.includes("topics")) {
    return topicsHandler(_req, url);
  }

  if (url.pathname.includes("questions")) {
    return questionsHandler(_req, url);
  }

  if (url.pathname.includes("common")) {
    return commonHander(_req, url);
  }

  return new Response(JSON.stringify({ message: "Not Found" }), {
    headers: getHeaders(),
    status: 404,
  });
});
