import { useChat } from "./hooks/useChat";
import { ChatInput } from "./components/ChatInput";

export const ChatView = () => {
  const { handleSendMessage, chatHistory, isLoading } = useChat();

  return (
    <div className="chat-container">
      <div className="chat-content">
        <div className="welcome-message">
          <h2>Hola! Soy Genesis, tu terapeuta personal!</h2>
          <p>En qué puedo ayudarte...</p>
        </div>

        <div className="messages-container">
          {chatHistory.map((item, index) => (
            <div
              key={index}
              className={`message ${item.isUser ? "user-message" : "bot-message"}`}
            >
              <div className="message-text">{item.message}</div>
              {item.results && (
                <div className="search-results">
                  <h4>Documentos relevantes:</h4>
                  <ul>
                    {item.results.slice(0, 3).map((doc, i) => (
                      <li key={i}>
                        <strong>{doc.title}</strong> - {doc.category}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message">
              <div className="message-text">Procesando tu consulta...</div>
            </div>
          )}
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
