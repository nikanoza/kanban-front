import axios from "axios";

const instance = axios.create({
  baseURL: "https://kanban-back-production.up.railway.app/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default instance;
