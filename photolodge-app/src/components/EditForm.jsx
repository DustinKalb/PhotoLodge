import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function EditForm({ post, onSave, onClose }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState(post.tags.join(", "));
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(post.folderId || "");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  fetch(`${apiBase}/api/folders/user/${userId}`)
      .then(res => res.json())
      .then(data => setFolders(data.data || []));
  }, []);

  async function handleEdit(e) {
    e.preventDefault();
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);

  await fetch(`${apiBase}/api/posts/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        tags: tagsArray,
        folderId: selectedFolder || null,
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
      <FormControl fullWidth style={{ margin: "12px 0" }}>
        <InputLabel id="folder-select-label">Folder</InputLabel>
        <Select
          labelId="folder-select-label"
          value={selectedFolder}
          label="Folder"
          onChange={e => setSelectedFolder(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {folders.map(folder => (
            <MenuItem key={folder._id} value={folder._id}>
              {folder.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button type="submit">Save Changes</button>
    </form>
  );
}