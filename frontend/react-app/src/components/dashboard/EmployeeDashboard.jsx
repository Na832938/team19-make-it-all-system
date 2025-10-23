import React, { useState, useMemo } from 'react';
import TodoPage from '../tasks/TodoPage.jsx'; // reuse existing to-do logic
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EmployeeDashboard() {
  // Simulated employee & task data
  const [employee] = useState({
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Development'
  });

  const [tasks, setTasks] = useState([
    { title: 'Finish report', completed: true },
    { title: 'Attend team meeting', completed: false },
    { title: 'Update project plan', completed: true },
    { title: 'Review code', completed: false }
  ]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const [topic, setTopic] = useState('');
  const [post, setPost] = useState('');

  const handlePost = () => {
    if (!topic.trim() || !post.trim()) return alert('Enter both topic and post.');
    console.log('Shared:', { topic, post });
    setTopic('');
    setPost('');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Employee Dashboard</h1>

      {/* Progress Section */}
      <div className="card mb-4">
        <div className="card-header">Task Completion Progress</div>
        <div className="card-body">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progress}%
            </div>
          </div>
        </div>
      </div>

      {/* Employee Info */}
      <div className="card mb-4">
        <div className="card-header">Employee Information</div>
        <div className="card-body">
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
        </div>
      </div>

      {/* Task Overview */}
      <div className="card mb-4">
        <div className="card-header">Task Overview</div>
        <div className="card-body">
          <p>You have {totalTasks} tasks assigned.</p>
          <ul>
            {tasks.map((t, i) => (
              <li key={i}>{t.title} – {t.completed ? '✅ Done' : '❌ Pending'}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Topic & Post Sharing */}
      <div className="card mb-4">
        <div className="card-header">Topic & Post Sharing</div>
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            rows="3"
            placeholder="Write your post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handlePost}>Share</button>
        </div>
      </div>

      {/* Integrate TodoPage */}
      <div className="card mb-4">
        <div className="card-header">Detailed Task Management</div>
        <div className="card-body">
          <TodoPage />
        </div>
      </div>
    </div>
  );
}
