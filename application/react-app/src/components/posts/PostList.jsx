import ListSection from "../common/ListSection";
import Button from "../common/Button";

export default function PostList({ posts, onView, onEdit, onDelete, loading = false }) {
  return (
    <ListSection
      title="Latest Posts"
      items={posts}
      variant="bordered"
      emptyMessage="No posts yet. Be the first to share something!"
      loading={loading}
      renderDetails={(post) => (
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h3 className="text-lg font-semibold text-gray-900 flex-1">{post.title}</h3>
            {post.topic && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap self-start">
                {post.topic}
              </span>
            )}
          </div>
          <p className="text-gray-600 line-clamp-2 text-sm sm:text-base">{post.content}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-500">
            <span>By {post.author || 'Anonymous'}</span>
            <span className="hidden sm:inline">•</span>
            <span>{new Date(post.date || post.createdAt).toLocaleDateString()}</span>
            {post.comments && (
              <>
                <span className="hidden sm:inline">•</span>
                <span>{post.comments.length} comments</span>
              </>
            )}
          </div>
        </div>
      )}
      renderActions={(post) => (
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Button
            type="secondary"
            size="small"
            className="!min-w-0 !px-3 flex-1 sm:flex-none"
            onClick={() => onView?.(post)}
          >
            <span className="sm:hidden">👁️</span>
            <span className="hidden sm:inline">View</span>
          </Button>
          <Button
            type="secondary"
            size="small"
            className="!min-w-0 !px-3 flex-1 sm:flex-none"
            onClick={() => onEdit?.(post)}
          >
            <span className="sm:hidden">✏️</span>
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            type="danger"
            size="small"
            className="!min-w-0 !px-3 flex-1 sm:flex-none"
            onClick={() => onDelete?.(post)}
          >
            <span className="sm:hidden">🗑️</span>
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      )}
    />
  );
}