import axios from "axios";

const BASE_API_URL = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://interview-prep-api.technologyexplorer.dev";

const http = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { http as default, BASE_API_URL };
