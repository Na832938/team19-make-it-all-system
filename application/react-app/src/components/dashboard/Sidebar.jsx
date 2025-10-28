import "./Sidebar.css";

export default function Sidebar({ activeSection, setActiveSection }) {
  const sections = [
    { key: "dashboard", label: "Dashboard" },
    { key: "todo", label: "Tasks" },
    { key: "topics", label: "Topics" },
    { key: "posts", label: "Posts" },
    { key: "KnowledgeBase", label: "Knowledge Base" }
  ];

  return (
    <aside className="app-sidebar">
      <nav>
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={activeSection === s.key ? "active" : ""}
          >
            {s.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
