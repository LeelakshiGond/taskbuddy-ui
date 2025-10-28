import axios from "axios";
import toast from "toast";
import "react-toastify/dist/ReactToastify.css";

export const API_PRIFIX = process.env.REACT_APP_API_PREFIX;

const client = axios.create({
  baseURL: API_PRIFIX,
});

client.interceptors.response.use(
  (response) => {
    const { data, config } = response;

    if (data.message && ["post", "put", "delete"].includes(config.method)) {
      toast.success(data.message.split("_").join(" "));
    }

    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      window.location.href = "/";
    }
    if (response && response.data && response.data.message) {
      toast.error(response.data.message);
    } else if (response.status === 500) {
      toast.error("INTERNAL SERVER ERROR");
    } else {
      toast.error("NETWORK ERROR");
    }
    return Promise.reject(error);
  }
);

export default client;
