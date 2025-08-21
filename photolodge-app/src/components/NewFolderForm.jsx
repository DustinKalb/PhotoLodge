import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function NewFolderForm({ onSave, onClose }) {
  const [folderName, setFolderName] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!folderName.trim()) {
      setError("Folder name is required");
      return;
    }
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch("http://localhost:8080/api/folders/create", {
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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2>Create New Folder</h2>
      <TextField
        label="Folder Name"
        value={folderName}
        onChange={e => setFolderName(e.target.value)}
        error={!!error}
        helperText={error}
        autoFocus
      />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </div>
    </form>
  );
}