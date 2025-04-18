import { useState } from "react";
import { Role } from "../../types/roleManagement";
import { FileUploader } from "../../components/common/FileUploader";
import { RoleMenu } from "../../components/common/RoleMenu";

export const ModelManagement = () => {
  const [currentRole, setCurrentRole] = useState<Role>("ADMIN");

  const [classificationFile, setClassificationFile] = useState<File | null>(
    null
  );
  const [inferenceFile, setInferenceFile] = useState<File | null>(null);

  const handleClassificationSubmit = () => {
    if (currentRole !== "ADMIN") return;
    console.log("Classification file submitted:", classificationFile);
    // Lógica para subir el archivo de clasificación
  };

  const handleInferenceSubmit = () => {
    if (currentRole !== "ADMIN") return;
    console.log("Inference file submitted:", inferenceFile);
    // Lógica para subir el archivo de inferencia
  };

  const handleViewDocuments = () => {
    console.log("View documents clicked");
    // Lógica para mostrar documentos
  };

  const adminContent = (
    <>
      <FileUploader
        title="Subir documento con el modelo de clasificación"
        onFileChange={setClassificationFile}
        onSubmit={handleClassificationSubmit}
      />

      <FileUploader
        title="Subir documento con inferencia"
        onFileChange={setInferenceFile}
        onSubmit={handleInferenceSubmit}
      />
    </>
  );

  return (
    <div className="model-management-container">
      <div className="upload-sections">
        {currentRole === "ADMIN" ? (
          adminContent
        ) : (
          <div className="access-denied">
            <h3>Acceso restringido</h3>
            <p>Solo usuarios ADMIN pueden acceder a esta funcionalidad</p>
          </div>
        )}

        <div className="view-documents-section">
          <button onClick={handleViewDocuments} className="view-button">
            Ver documentos
          </button>
          <div className="documents-list"></div>
        </div>
      </div>
      <RoleMenu
        onRoleChange={setCurrentRole}
        initialRole="ADMIN"
        allowRoleChange={false}
      />
    </div>
  );
};
