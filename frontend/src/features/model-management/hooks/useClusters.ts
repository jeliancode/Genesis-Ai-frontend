import { useState, useEffect } from "react";
import { getClusterData } from "../../../lib/api/clusterService";
import { ClusterResponse } from "../../../types/apiTypes";

export const useCluster = () => {
  const [clusterData, setClusterData] = useState<ClusterResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClusterData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getClusterData();
      setClusterData(data);
    } catch (err) {
      setError("Error al cargar datos de cluster");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClusterData();
  }, []);

  const refreshClusterData = async () => {
    await fetchClusterData();
  };

  return {
    clusterData,
    isLoading,
    error,
    refreshClusterData,
  };
};
