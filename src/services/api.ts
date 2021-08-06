import axios from "axios";

const api = axios.create({
  baseURL: "https://nlw-podcastr.herokuapp.com/",
});

export default api;
