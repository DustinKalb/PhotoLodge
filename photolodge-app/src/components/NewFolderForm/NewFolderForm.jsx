import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './NewFolderForm.css';

export default function NewFolderForm({ onSave, onClose }) {
  const [folderName, setFolderName] = React.useState("");
  const [error, setError] = React.useState("");
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!folderName.trim()) {
      setError("Folder name is required");
      return;
    }
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch(`${apiBase}/api/folders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: folderName, userId }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create folder");
        return;
      }
      const data = await res.json();
      if (onSave) await onSave(data);
      setFolderName("");
      if (onClose) onClose();
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-folder-form">
      <h2 className="new-folder-title">Create New Folder</h2>
      <TextField
        label="Folder Name"
        value={folderName}
        onChange={e => setFolderName(e.target.value)}
        error={!!error}
        helperText={error}
        autoFocus
      />
      <div className="new-folder-actions">
        <Button type="submit" variant="contained">
          Create
        </Button>
      </div>
    </form>
  );
}