import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://iyouthresource.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
