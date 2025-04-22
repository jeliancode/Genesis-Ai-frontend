import { useState } from "react";
import { FileUploader } from "../../components/common/FileUploader";
import { ClusterVisualization } from "./components/ClusterVisualization";
import { useDocuments } from "./hooks/useDocuments";
import { useCluster } from "./hooks/useClusters";
import "@/styles/modelManagement.css";

export const ModelManagement = () => {
  const [showClusters, setShowClusters] = useState(false);
  const { refreshClusterData } = useCluster();
  const {
    handleInferenceUpload,
    handleClassificationUpload,
    isLoading,
    error,
  } = useDocuments();

  const handleClassificationSubmit = async (file: File | null) => {
    if (!file) return;
    try {
      await handleClassificationUpload(file);
      await refreshClusterData();
    } catch (err) {
      console.error("Error en clasificación:", err);
    }
  };

  const handleInferenceSubmit = async (file: File | null) => {
    if (!file) return;
    try {
      await handleInferenceUpload(file);
      await refreshClusterData();
    } catch (err) {
      console.error("Error en inferencia:", err);
    }
  };

  const handleViewDocuments = () => {
    setShowClusters(!showClusters);
  };

  return (
    <div className="model-management-container">
      <div className="upload-sections">
        <FileUploader
          title="Subir documento con el modelo de clasificación"
          onSubmit={handleClassificationSubmit}
          isLoading={isLoading}
        />

        <FileUploader
          title="Subir documento con inferencia"
          onSubmit={handleInferenceSubmit}
          isLoading={isLoading}
        />

        {error && <div className="error-message">{error}</div>}

        <div className="view-documents-section">
          <button
            onClick={handleViewDocuments}
            className="view-button"
            disabled={isLoading}
          >
            {showClusters ? "Ocultar documentos" : "Ver documentos"}
          </button>

          <div className="documents-list">
            {showClusters && <ClusterVisualization key={Date.now()} />}
          </div>
        </div>
      </div>
    </div>
  );
};
