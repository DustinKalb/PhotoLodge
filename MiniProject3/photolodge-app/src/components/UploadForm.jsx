"use client";

import { useState } from "react";

export default function UploadForm({ onSave, onClose }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  // Replace with your actual userId and folderId
  const userId = "6895147d0664efd48bf2f632";
  const folderId = "6895150d0664efd48bf2f634";

  // Upload image to backend (Cloudinary)
  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:8080/api/posts/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.imageUrl;
  }

  // Save post to backend (MongoDB)
  async function savePost(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);

      // 1. Upload image and get Cloudinary URL
      const imageUrl = await uploadImage(file);

      // 2. Send post data to backend
      const postData = {
        title: name,
        description,
        tags: tagsArray,
        imageUrl,
        userId,
        folderId,
      };

      await fetch("http://localhost:8080/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      setLoading(false);
      if (onSave) onSave();
      if (onClose) onClose();
    } catch (err) {
      setLoading(false);
      alert("Upload failed!");
      console.error(err);
    }
  }

  return (
    <form onSubmit={savePost}>
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
        style={{ backgroundColor: "white", color: "black", borderColor: "gray", borderRadius: "5px", borderWidth: "2px" }} />
      </div>
      <div>
        <label>Tags (comma separated):</label>
        <input value={tags} onChange={e => setTags(e.target.value)}
        style={{ backgroundColor: "white", color: "black", borderColor: "gray", borderRadius: "5px" }} />
      </div>
      <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Save"}</button>
    </form>
  );
}