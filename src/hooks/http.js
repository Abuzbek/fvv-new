import axios from "axios";

const http = axios.create({
  baseURL: "https://back.fvv.technocorp.uz",
});

export default http;
