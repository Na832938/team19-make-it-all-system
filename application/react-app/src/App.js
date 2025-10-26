import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./components/tasks/TodoPage";
import PostPage from "./components/posts/PostPage";
import LoginPage from "./components/authentication/LoginPage";
import RegisterPage from "./components/authentication/RegisterPage";
import TopicPage from "./components/topics/TopicPage";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
import KnowledgeBase from "./components/KnowledgeBase/KnowledgeBase";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/topics" element={<TopicPage />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/knowledge" element={<KnowledgeBase />}/>
      </Routes>
    </Router>
  );
}

export default App;