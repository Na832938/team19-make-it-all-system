// PostList.jsx
import ListSection from "../common/ListSection";

export default function PostList({ posts, onView, onEdit, onDelete }) {
  return (
    <ListSection
      title="Latest Posts"
      items={posts}
      iconUrl="https://cdn-icons-png.flaticon.com/512/3039/3039388.png"
      emptyMessage="No posts available."
      renderDetails={(post) => (
        <>
          <h3>{post.title}</h3>
          <p className="post-topic">{post.topic}</p>
          <p className="post-content">{post.content}</p>
        </>
      )}
      renderActions={(post) => (
        <>
          <button
            className="icon-button"
            onClick={() => onView(post.id)}
            title="View"
          >
            <i className="ph-eye"></i>
          </button>
          <button
            className="icon-button"
            onClick={() => onEdit(post.id)}
            title="Edit"
          >
            <i className="ph-pencil"></i>
          </button>
          <button
            className="icon-button"
            onClick={() => onDelete(post.id)}
            title="Delete"
          >
            <i className="ph-trash"></i>
          </button>
        </>
      )}
    />
  );
}
