import Accordion from "../common/Accordion";
import Button from "../common/Button";

export default function KnowledgeList({ subjects, loading = false }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="border border-gray-200 rounded-md animate-pulse">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl">📚</span>
        </div>
        <p className="text-gray-600 text-lg font-medium mb-2">No articles found</p>
        <p className="text-gray-500 text-sm">Check back later for new knowledge base articles.</p>
      </div>
    );
  }

  const accordionItems = subjects.map((subject) => ({
    id: subject.id,
    header: (isExpanded) => (
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {subject.Question || subject.title || subject.name}
        </h3>
        {/* REMOVED the description preview - only show title when collapsed */}
      </div>
    ),
    content: () => (
      <div>
        <div className="prose prose-sm max-w-none mb-4">
          <p className="text-gray-700 leading-relaxed">
            {subject.description || subject.answer || subject.content}
          </p>
        </div>

        {(subject.category || subject.difficulty) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {subject.category && (
              <span className="badge badge-purple">
                {subject.category}
              </span>
            )}
            {subject.difficulty && (
              <span className={`badge ${
                subject.difficulty === 'Easy' ? 'badge-success' :
                subject.difficulty === 'Medium' ? 'badge-warning' :
                'badge-error'
              }`}>
                {subject.difficulty}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          {subject.link && (
            <Button
              type="primary"
              size="small"
              onClick={() => window.open(subject.link, '_blank')}
              className="text-sm"
            >
              Open Article
            </Button>
          )}
        </div>
      </div>
    )
  }));

  return <Accordion items={accordionItems} />;
}