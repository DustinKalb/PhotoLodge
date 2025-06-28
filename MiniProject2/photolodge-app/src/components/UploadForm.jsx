"use client";

import { useState } from "react";

export default function UploadForm({ onSave, onClose }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    onSave({ file, name, description, tags: tagsArray });
  };

  {/* Upload form allowing users to select an image, name, description, and tags, before hitting save */}
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image File:</label>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required />
      </div>
      <div>
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} required
        style={{ backgroundColor: "white", color: "black", borderColor: "gray", borderRadius: "5px" }} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)}
        style={{ backgroundColor: "white", borderColor: "gray", borderRadius: "5px", borderWidth: "2px" }} />
      </div>
      <div>
        <label>Tags (comma separated):</label>
        <input value={tags} onChange={e => setTags(e.target.value)}
        style={{ backgroundColor: "white", borderColor: "gray", borderRadius: "5px" }} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}