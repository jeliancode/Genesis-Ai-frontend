import { Link } from "react-router-dom";
import "../../styles/Navigation.css";

export const Navigation = () => {
  return (
    <nav className="main-navigation">
      <Link to="/chat" className="nav-link">
        Chat
      </Link>
      <Link to="/files" className="nav-link">
        Files
      </Link>
    </nav>
  );
};
