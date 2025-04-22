import axios from "axios";
import { QueryRequest, QueryResponse } from "../../types/apiTypes";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const sendQuery = async (prompt: string): Promise<QueryResponse> => {
  const { data } = await axios.post<QueryResponse>(`${API_BASE_URL}/query`, {
    prompt,
  } as QueryRequest);
  return data;
};
