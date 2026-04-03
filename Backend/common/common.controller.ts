import {} from "../questions/questions.service.ts";
import getHeaders from "../utils/getHeaders.ts";
import {
  getAsset,
  searchTopicsAndQuestions,
  uploadAsset,
} from "./common.service.ts";

function commonHander(req: Request, url: URL) {
  if (url.pathname.includes("search") && req.method === "GET") {
    return searchTopicsAndQuestions(url);
  }

  if (url.pathname.includes("upload") && req.method === "POST") {
    return uploadAsset(req);
  }
  const ASSET_ROUTE = new URLPattern({ pathname: "/common/static/:file" });
  const ASSET_ROUTE_MATCH = ASSET_ROUTE.exec(req.url);

  if (ASSET_ROUTE_MATCH && req.method === "GET") {
    return getAsset(ASSET_ROUTE_MATCH.pathname.groups.file!);
  }

  return new Response(JSON.stringify({ message: "Not Found" }), {
    headers: getHeaders(),
    status: 404,
  });
}

export { commonHander };
