import { useState } from "react";
import { Role } from "../../types/roleManagement";
import { RoleMenu } from "../../components/common/RoleMenu";
import { ChatInput } from "./components/ChatInput";
import "../../styles/chat.css";

export const ChatView = () => {
  const [currentRole, setCurrentRole] = useState<Role>("USER");
  const [messages, setMessages] = useState<
    Array<{
      text: string;
      isBot: boolean;
    }>
  >([]);

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          text: message,
          isBot: currentRole === "ADMIN",
        },
      ]);
      console.log(`Mensaje enviado como ${currentRole}:`, message);
    }
  };

  const showAdminFeatures = currentRole === "ADMIN";

  return (
    <div className="chat-container">
      <div className="chat-content">
        <div className="welcome-message">
          <h2>Hola! Soy Genesis, tu terapeuta personal!</h2>
          <p>En qué puedo ayudarte...</p>
          {showAdminFeatures && (
            <div className="admin-badge">Modo Administrador</div>
          )}
        </div>

        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.isBot ? "bot-message" : "user-message"}`}
            >
              {msg.text}
              {msg.isBot && <span className="admin-tag"> (Admin)</span>}
            </div>
          ))}
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          showAdminControls={showAdminFeatures}
        />
      </div>

      <RoleMenu
        onRoleChange={setCurrentRole}
        initialRole="USER"
        allowRoleChange={true}
      />
    </div>
  );
};
