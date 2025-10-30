import SubjectList from './KnowledgeItem.jsx';

const subjects = [
  { id: 1, Question: "How to order printing paper ?", description: "Just send an email to HR " },
  { id: 2, Question: "How to configure my microsoft account ?", description: "Contact IT if issues arise" },
  { id: 3, Question: "When are salaries paid out ?", description: "On the 25th of each month." }
];

export default function KnowledgeBase() {
  return (
    <div className="knowledge-page">
      <div className="dashboard-grid">
        <div className="full-width-card">
          <h2>Subjects</h2>
          <SubjectList subjects={subjects} />
        </div>
      </div>
    </div>
  );
}
