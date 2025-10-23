export default function PostItem({ post }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "0.75rem", borderRadius: "5px", marginBottom: "0.5rem" }}>
      <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>{post.title}</div>
      <div>{post.content}</div>
    </div>
  );
}
