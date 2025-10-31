export default function Sidebar({ activeSection, setActiveSection }) {
  const sections = [
    { key: "dashboard", label: "Dashboard" },
    { key: "todo", label: "Tasks" },
    { key: "topics", label: "Topics" },
    { key: "posts", label: "Posts" },
    { key: "KnowledgeBase", label: "Knowledge Base" }
  ];

  return (
    <aside className="
      bg-white border-r border-gray-300
      p-4
      flex flex-col
      h-full
    ">
      <nav className="flex flex-col gap-2">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`
              text-gray-600 bg-transparent border-none
              text-left font-medium
              cursor-pointer
              px-3 py-2 rounded-md
              transition-colors duration-200
              hover:text-gray-900 hover:bg-gray-100
              ${activeSection === s.key ? 
                'text-blue-600 font-semibold bg-blue-100' : 
                ''
              }
            `}
          >
            {s.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}