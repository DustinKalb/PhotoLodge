"use client";

import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function UploadForm({ onSave, onClose }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  fetch(`${apiBase}/api/folders/user/${userId}`)
      .then(res => res.json())
      .then(data => setFolders(data.data || []));
  }, []);

  // Upload image to backend (Cloudinary)
  async function uploadImage(file) {
    const formData = new FormData();
    const userId = localStorage.getItem("userId");
    formData.append("userId", userId); // <-- first
    formData.append("image", file);    // <-- second

  const res = await fetch(`${apiBase}/api/posts/upload`, {
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
      const imageUrl = await uploadImage(file);

      const userId = localStorage.getItem("userId");

      const postData = {
        title: name,
        description,
        tags: tagsArray,
        imageUrl,
        userId,
        folderId: selectedFolder || null, // This will be null if nothing is selected
      };

  const response = await fetch(`${apiBase}/api/posts/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.error || "Upload failed!");
        setLoading(false);
        return;
      }

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
      <FormControl fullWidth style={{ margin: "12px 0" }}>
        <InputLabel id="folder-select-label">Folder</InputLabel>
        <Select
          labelId="folder-select-label"
          value={selectedFolder}
          label="Folder"
          onChange={e => setSelectedFolder(e.target.value)}
        >
          {folders.map(folder => (
            <MenuItem key={folder._id} value={folder._id}>
              {folder.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Save"}</button>
    </form>
  );
}