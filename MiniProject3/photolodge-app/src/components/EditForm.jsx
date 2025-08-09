import { useState } from "react";

export default function EditForm({ post, onSave, onClose }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState(post.tags.join(", "));

  async function handleEdit(e) {
    e.preventDefault();
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);

    await fetch(`http://localhost:8080/api/posts/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        tags: tagsArray,
      }),
    });

    if (onSave) onSave();
    if (onClose) onClose();
  }

  return (
    <form onSubmit={handleEdit}>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <img
          src={post.imageUrl}
          alt={post.title}
          style={{ maxWidth: "100%" }}
        />
      </div>
      <div>
        <label>Title:</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Tags (comma separated):</label>
        <input value={tags} onChange={e => setTags(e.target.value)} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}