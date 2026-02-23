import axios from "axios";
import axiosRetry from "axios-retry";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

axiosRetry(api, {
  retries: 5,
  retryDelay: (retryCount) => {
    console.log(`This is the ${retryCount}th attempt`);
    return retryCount * 1000;
  },
  shouldResetTimeout: true,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code == "ECONNABORTED"
    );
  },
});

export default api;
