import KnowledgeList from './KnowledgeList.jsx';
import subjects from '../../data/subjects.json';

export default function KnowledgeBase() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
          <p className="text-gray-600">Find answers to common questions and company procedures</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-1">
              Browse through {subjects.length} common questions and their answers
            </p>
          </div>
          
          <KnowledgeList subjects={subjects} />
        </div>
      </div>
    </div>
  );
}