import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API = axios.create({ baseURL });

export const generateSchedule = (data) => API.post("api/v1/timetable/schedule", data);