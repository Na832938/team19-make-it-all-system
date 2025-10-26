import PostItem from "./PostItem";

export default function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map(post => <PostItem key={post.id} post={post} />)
      )}
    </div>
  );
}
