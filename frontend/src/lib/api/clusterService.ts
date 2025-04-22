import axios from "axios";
import { ClusterResponse } from "../../types/apiTypes";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const getClusterData = async (): Promise<ClusterResponse> => {
  const { data } = await axios.get<ClusterResponse>(`${API_BASE_URL}/cluster`);
  return data;
};
