import { ChangeEvent, useState } from "react";

interface FileUploaderProps {
  title: string;
  onSubmit: (file: File | null) => void;
  isLoading?: boolean;
  accept?: string;
}

export const FileUploader = ({
  title,
  onSubmit,
  isLoading = false,
  accept = ".pdf,.txt",
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit(file);
    setFile(null);
    const fileInput = document.querySelector(
      `input[type="file"][accept="${accept}"]`
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="file-uploader">
      <h3 className="uploader-title">{title}</h3>
      <div className="uploader-controls">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="file-input"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          className="submit-button"
          disabled={isLoading || !file}
        >
          {isLoading ? "Procesando..." : "Submit"}
        </button>
      </div>
      {file && (
        <div className="file-info">
          Archivo seleccionado: {file.name} ({Math.round(file.size / 1024)} KB)
        </div>
      )}
    </div>
  );
};
