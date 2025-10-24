import React from "react";
import './PostItem.css';

export default function PostItem({ post }) {
  return (
    <div className="post-item">
      <div className="post-item-title">{post.title}</div>
      <div>{post.content}</div>
    </div>
  );
}
