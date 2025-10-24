import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./components/tasks/TodoPage";
import PostPage from "./components/posts/PostPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import TopicPage from "./components/topics/TopicPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/topics" element={<TopicPage />} />
      </Routes>
    </Router>
  );
}

export default App;