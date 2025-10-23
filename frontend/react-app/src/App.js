import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./TodoPage";
import PostPage from "./PostPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/posts" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
