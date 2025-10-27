// PostList.jsx
import "./PostList.css";

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="no-posts">No posts available.</div>;
  }

  return (
    <section className="post-section">
      <div className="post-section-header">
        <h2>Latest Posts</h2>
        <div className="post-filter-info">
          <p>{posts.length} posts</p>
        </div>
      </div>

      <div className="post-card">
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-row">
              <div className="post-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3039/3039388.png"
                  alt="Post icon"
                />
              </div>

              <div className="post-details">
                <h3>{post.title}</h3>
                <p className="post-topic">{post.topic}</p>
                <p className="post-content">{post.content}</p>
              </div>

              <div className="post-actions">
                <button className="icon-button" title="View">
                  <i className="ph-eye"></i>
                </button>
                <button className="icon-button" title="Edit">
                  <i className="ph-pencil"></i>
                </button>
                <button className="icon-button" title="Delete">
                  <i className="ph-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
