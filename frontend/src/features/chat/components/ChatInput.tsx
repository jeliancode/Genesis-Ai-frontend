import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  showAdminControls?: boolean;
}

export const ChatInput = ({
  onSendMessage,
  showAdminControls = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      {showAdminControls && (
        <div className="admin-controls">
          <button type="button" className="admin-button">
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
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};
