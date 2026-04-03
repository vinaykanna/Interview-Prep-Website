import http from "./http";

function getTopics({ parent }: { parent?: string }) {
  const params: any = {};

  if (parent) {
    params.parent = parent;
  }

  return http.get("/topics", { params });
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

function getQuestion({ topic }: { topic: string }) {
  return http.get(`/questions/${topic}`);
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

function searchQuestionsAndTopics(query: string) {
  return http.get(`/common/search?query=${query}`);
}

function uploadAsset(formData: any) {
  return http.post(`/common/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
  getQuestion,
  searchQuestionsAndTopics,
  uploadAsset,
};
