import { useState } from "react";
import ListSection from "../common/ListSection";

export default function SubjectList({ subjects }) {
  const [expandedIds, setExpandedIds] = useState({});

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ListSection
      title="Available Subjects"
      items={subjects}
      iconUrl="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
      emptyMessage="No Subjects available."
      renderDetails={(subject) => (
        <>
          <dt>{subject.Question}</dt>
          {expandedIds[subject.id] && <dd>{subject.description}</dd>}
        </>
      )}
      renderActions={(subject) => (
        <button
          className="icon-button"
          onClick={() => toggleExpand(subject.id)}
          title="Toggle Details"
        >
          {expandedIds[subject.id] ? "Hide" : "More"}
        </button>
      )}
    />
  );
}
