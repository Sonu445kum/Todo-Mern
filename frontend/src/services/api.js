import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.accessToken) {
    req.headers.Authorization = `Bearer ${user.accessToken}`;
  }

  return req;
});

export default API;