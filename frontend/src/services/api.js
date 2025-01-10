import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const seedDatabase = () => API.get("/init/seed");
export const fetchTransactions = (params) => API.get("/transactions", { params });