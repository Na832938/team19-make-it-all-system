import { useState } from "react";
import ListSection from "../common/ListSection";
import Button from "../common/Button";

export default function SubjectList({ subjects, loading = false }) {
  const [expandedIds, setExpandedIds] = useState({});

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ListSection
      title="Available Subjects"
      items={subjects}
      variant="bordered"
      emptyMessage="No subjects available. Check back later for new topics."
      loading={loading}
      renderDetails={(subject) => (
        <div className="space-y-3">
          {/* Question/Title */}
          <h3 className="text-lg font-semibold text-gray-900">
            {subject.Question || subject.title || subject.name}
          </h3>

          {/* Expanded Description */}
          {expandedIds[subject.id] && (
            <div className="space-y-2">
              <div className="w-8 h-px bg-gray-300"></div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {subject.description || subject.answer || subject.content}
              </p>
              
              {/* Additional metadata if available */}
              {(subject.category || subject.difficulty) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {subject.category && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      {subject.category}
                    </span>
                  )}
                  {subject.difficulty && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      subject.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      subject.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {subject.difficulty}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Collapsed preview */}
          {!expandedIds[subject.id] && subject.description && (
            <p className="text-gray-500 text-sm line-clamp-2">
              {subject.description.length > 150 
                ? `${subject.description.substring(0, 150)}...` 
                : subject.description
              }
            </p>
          )}
        </div>
      )}
      renderActions={(subject) => (
        <div className="flex gap-2">
          <Button
            type="secondary"
            size="small"
            className="!min-w-0 !px-4"
            onClick={() => toggleExpand(subject.id)}
          >
            {expandedIds[subject.id] ? (
              <>
                <span className="sm:hidden">▲</span>
                <span className="hidden sm:inline">Show Less</span>
              </>
            ) : (
              <>
                <span className="sm:hidden">▼</span>
                <span className="hidden sm:inline">Show More</span>
              </>
            )}
          </Button>
          
          {/* Additional actions if needed */}
          {subject.link && (
            <Button
              type="primary"
              size="small"
              className="!min-w-0 !px-4"
              onClick={() => window.open(subject.link, '_blank')}
            >
              <span className="sm:hidden">🔗</span>
              <span className="hidden sm:inline">Open</span>
            </Button>
          )}
        </div>
      )}
    />
  );
}