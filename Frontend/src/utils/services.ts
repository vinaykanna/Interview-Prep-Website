import http from "./http";

function getTopics({ parent }: { parent: string }) {
  return http.get(`/topics?parent=${parent || "none"}`);
}

function createTopic(data: any) {
  return http.post(`/topics`, data);
}

function updateTopic({ id, data }: any) {
  return http.put(`/topics/${id}`, data);
}

function deleteTopic(id: number) {
  return http.delete(`/topics/${id}`);
}

function getQuestions({ topic }: { topic: string }) {
  return http.get(`/questions?topic=${topic}`);
}

function createQuestion(data: any) {
  return http.post(`/questions`, data);
}

function updateQuestion({ id, data }: any) {
  return http.put(`/questions/${id}`, data);
}

function deleteQuestion(id: number) {
  return http.delete(`/questions/${id}`);
}

export {
  getTopics,
  createTopic,
  createQuestion,
  getQuestions,
  updateTopic,
  deleteTopic,
  updateQuestion,
  deleteQuestion,
};
