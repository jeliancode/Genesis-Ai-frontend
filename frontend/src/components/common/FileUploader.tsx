import { ChangeEvent } from "react";

interface FileUploaderProps {
  title: string;
  accept?: string;
  onFileChange: (file: File) => void;
  onSubmit: () => void;
}

export const FileUploader = ({
  title,
  accept = ".pdf,.txt",
  onFileChange,
  onSubmit,
}: FileUploaderProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileChange(e.target.files[0]);
    }
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
        />
        <button onClick={onSubmit} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};
