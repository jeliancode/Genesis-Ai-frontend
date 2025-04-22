import axios from "axios";
import { DocumentUploadResponse } from "../../types/apiTypes";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const uploadInferenceDocument = async (
  file: File
): Promise<DocumentUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post<DocumentUploadResponse>(
    `${API_BASE_URL}/documents/inference`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const uploadClassificationDocument = async (
  file: File
): Promise<DocumentUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post<DocumentUploadResponse>(
    `${API_BASE_URL}/documents/classify`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
