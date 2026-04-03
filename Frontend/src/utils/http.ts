import axios from "axios";

const BASE_API_URL = import.meta.env.DEV
  ? "http://localhost:4000"
  : "https://interview-prep-website-be.vinaykanna.deno.net";

const http = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { http as default, BASE_API_URL };
