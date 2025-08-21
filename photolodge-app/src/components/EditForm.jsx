import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditForm({ post, onSave, onClose }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState(post.tags.join(", "));
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(post.folderId || "");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8080/api/folders/user/${userId}`)
      .then(res => res.json())
      .then(data => setFolders(data.data || []));
  }, []);

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
        folderId: selectedFolder || null,
      }),
    });

    if (onSave) onSave();
    if (onClose) onClose();
  }

  return (
    <form onSubmit={handleEdit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <img
        src={post.imageUrl}
        alt={post.title}
        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, marginBottom: 8, alignSelf: 'center' }}
      />
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
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
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
}