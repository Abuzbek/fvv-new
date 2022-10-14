import axios from "axios";

const http = axios.create({
  baseURL: "https://fvvfmi.uz",
});

export default http;
