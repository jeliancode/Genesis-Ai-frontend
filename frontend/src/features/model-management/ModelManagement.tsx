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

  const onUpload = async (file: File | null, mode: "classify" | "infer") => {
    if (!file) return;
    try {
      if (mode === "classify") {
        await handleClassificationUpload(file);
      } else {
        await handleInferenceUpload(file);
      }
      await refreshClusterData();
      setShowClusters(true);
    } catch (err) {
      console.error(`Error en ${mode}:`, err);
    }
  };

  return (
    <div className="model-management-container">
      <div className="upload-sections">
        <FileUploader
          title="Subir documento con el modelo de clasificación"
          onSubmit={(f) => onUpload(f, "classify")}
          isLoading={isLoading}
        />
        <FileUploader
          title="Subir documento con inferencia"
          onSubmit={(f) => onUpload(f, "infer")}
          isLoading={isLoading}
        />

        {error && <div className="error-message">{error}</div>}

        <div className="view-documents-section">
          <button
            onClick={() => setShowClusters((v) => !v)}
            className="view-button"
            disabled={isLoading}
          >
            {showClusters ? "Ocultar documentos" : "Ver documentos"}
          </button>

          {showClusters && (
            <div className="documents-list">
              <ClusterVisualization />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
