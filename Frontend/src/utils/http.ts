import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://interview-prep-api.technologyexplorer.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
