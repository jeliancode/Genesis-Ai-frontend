import { useState } from "react";
import { trainModel } from "../../../lib/api/trainingService";
import {
  uploadInferenceDocument,
  uploadClassificationDocument,
} from "../../../lib/api/documentService";
import { DocumentUploadResponse } from "../../../types/apiTypes";

export const useDocuments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInferenceUpload = async (
    file: File
  ): Promise<DocumentUploadResponse> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await uploadInferenceDocument(file);
      return response;
    } catch (err) {
      setError("Error al subir documento para inferencia");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleClassificationUpload = async (
    file: File
  ): Promise<DocumentUploadResponse> => {
    try {
      setIsLoading(true);
      setError(null);
      await trainModel();
      const response = await uploadClassificationDocument(file);
      return response;
    } catch (err) {
      setError("Error al subir documento para clasificación");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleInferenceUpload,
    handleClassificationUpload,
    isLoading,
    error,
  };
};
