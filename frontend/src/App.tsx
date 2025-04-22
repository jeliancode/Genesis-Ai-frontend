import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModelManagement } from "./features/model-management/ModelManagement";
import { ChatView } from "./features/chat/ChatView";
import { Navigation } from "./components/common/Navigation";
import "./styles/modelManagement.css";
import "./styles/chat.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/files" element={<ModelManagement />} />
          <Route path="/chat" element={<ChatView />} />
          <Route path="*" element={<ChatView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
