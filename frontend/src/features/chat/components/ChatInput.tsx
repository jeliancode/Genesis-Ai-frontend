import { useState } from "react";
import "../../../styles/chatInput.css";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  showAdminControls?: boolean;
  isLoading?: boolean;
}

export const ChatInput = ({
  onSendMessage,
  showAdminControls = false,
  isLoading = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      {showAdminControls && (
        <div className="admin-controls">
          <button type="button" className="admin-button" disabled={isLoading}>
            Comando Especial
          </button>
        </div>
      )}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Cuéntame qué pasa..."
        className="chat-input"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="send-button"
        disabled={isLoading || !message.trim()}
      >
        {isLoading ? "Enviando..." : "Send"}
      </button>
    </form>
  );
};
