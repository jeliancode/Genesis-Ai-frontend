import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const trainModel = async () => {
  const response = await axios.post(`${API_BASE_URL}/train`);
  return response.data;
};
