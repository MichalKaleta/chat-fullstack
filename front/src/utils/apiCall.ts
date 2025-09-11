import axios from "axios";

const { VITE_ENV, VITE_API_PORT } = import.meta.env;
console.log(VITE_ENV, VITE_API_PORT);

const baseURL =
  VITE_ENV === "production"
    ? `https://${window.location.host}`
    : `http://localhost:${VITE_API_PORT}`;

export const apiCall = axios.create({ baseURL });
