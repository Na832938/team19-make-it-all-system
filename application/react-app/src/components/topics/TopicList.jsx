import ListSection from "../common/ListSection";
import Button from "../common/Button";

export default function TopicList({ topics, onSelect }) {
  return (
    <ListSection
      title="Available Topics"
      items={topics}
      variant="bordered"
      emptyMessage="No topics available."
      renderDetails={(topic) => (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
          <p className="text-gray-600">{topic.description}</p>
        </div>
      )}
      renderActions={(topic) => (
        <Button
          type="secondary"
          size="small"
          className="!min-w-0 !px-4"
          onClick={() => onSelect(topic)}
        >
          <span className="sm:hidden">→</span>
          <span className="hidden sm:inline">Open</span>
        </Button>
      )}
    />
  );
}