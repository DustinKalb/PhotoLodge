
"use client";

import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './UploadForm.css';

export default function UploadForm({ onSave, onClose }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  // Show image preview when file changes
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8080/api/folders/user/${userId}`)
      .then(res => res.json())
      .then(data => setFolders(data.data || []));
  }, []);

  // Upload image to backend (Cloudinary)
  async function uploadImage(file) {
    const formData = new FormData();
    const userId = localStorage.getItem("userId");
    formData.append("userId", userId); // <-- first
    formData.append("image", file);    // <-- second

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

      const response = await fetch("http://localhost:8080/api/posts/create", {
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
    <form onSubmit={savePost} className="upload-form">
      <h2 className="upload-form-title">Upload New Image</h2>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="upload-form-preview"
        />
      )}
      <Button
        variant="outlined"
        component="label"
        className="upload-form-file-btn"
      >
        Upload Image File
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={e => setFile(e.target.files[0])}
          required
        />
      </Button>
      <TextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        multiline
        minRows={2}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <FormControl fullWidth className="upload-form-folder-select">
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
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? "Uploading..." : "Save"}
      </Button>
    </form>
  );
}