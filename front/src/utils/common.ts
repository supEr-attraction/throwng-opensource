import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosApi = () => {
  const instance = axios.create({
    baseURL: `${BASE_URL}/api`,
  });

  const token = localStorage.getItem("jwt");

  instance.defaults.headers.common["Authorization"] = token;
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";
  instance.defaults.headers.delete["Content-Type"] = "application/json";

  return instance;
};

const axiosFileApi = () => {
  const instanceFile = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const token = localStorage.getItem("jwt");
  if (token) {
    instanceFile.defaults.headers.common["Authorization"] = token;
  }

  return instanceFile;
};

export { axiosApi, axiosFileApi };
