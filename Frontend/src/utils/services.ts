import http from "./http";

function getTopics({ parent }: { parent: string }) {
  return http.get(`/topics?parent=${parent || "none"}`);
}

export { getTopics };
