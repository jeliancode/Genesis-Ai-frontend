import { useState } from "react";
import { sendQuery } from "../../../lib/api/queryService";
import { trainModel } from "../../../lib/api/trainingService";
import { QueryResponse } from "../../../types/apiTypes";

export const useChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<
    Array<{
      message: string;
      isUser: boolean;
      results?: QueryResponse["results"];
    }>
  >([]);

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      setChatHistory((prev) => [...prev, { message, isUser: true }]);

      await trainModel();

      const response = await sendQuery(message);

      const categories = [...new Set(response.results.map((r) => r.category))];
      const categoriesMessage = `Categorías relacionadas: ${categories.join(", ")}`;

      setChatHistory((prev) => [
        ...prev,
        {
          message: categoriesMessage,
          isUser: false,
          results: response.results,
        },
      ]);

      return response;
    } catch (err) {
      setError("Error al procesar la consulta");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSendMessage,
    chatHistory,
    isLoading,
    error,
    setChatHistory,
  };
};
