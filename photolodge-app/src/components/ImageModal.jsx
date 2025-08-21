import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ImagePreview from "./ImagePreview";
import EditForm from "./EditForm";
import UploadForm from "./UploadForm";
import NewFolderForm from "./NewFolderForm";

export default function ImageModal({ open, mode: initialMode = "preview", image, onClose, onSave, onDelete }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    if (open) setMode(initialMode);
  }, [open, initialMode]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          background: "#222",
          color: "#fff",
          p: 4,
          borderRadius: 2,
          maxWidth: 500,
          mx: "auto",
          mt: 10,
          outline: "none",
          "&:focus": { outline: "none" }
        }}
      >
        {/* Debug line, optional: */}
        {/* <div>Current mode: {mode}</div> */}
        {mode === "preview" && image && (
          <ImagePreview
            image={image}
            onEdit={() => setMode("edit")}
            onDelete={onDelete}
            onClose={onClose}
          />
        )}
        {mode === "edit" && image && (
          <EditForm
            post={image}
            onSave={() => {
              setMode("preview");
              if (onSave) onSave();
            }}
            onClose={() => setMode("preview")}
          />
        )}
        {mode === "upload" && (
          <UploadForm
            onSave={() => {
              setMode("preview");
              if (onSave) onSave();
            }}
            onClose={() => setMode("preview")}
          />
        )}
        {mode === "newFolder" && (
          <NewFolderForm
            onSave={() => {
              setMode("preview");
              if (onSave) onSave();
            }}
            onClose={() => setMode("preview")}
          />
        )}
      </Box>
    </Modal>
  );
}