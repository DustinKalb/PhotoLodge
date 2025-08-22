import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ImagePreview from "../ImagePreview/ImagePreview";
import EditForm from "../EditForm/EditForm";
import UploadForm from "../UploadForm/UploadForm";
import NewFolderForm from "../NewFolderForm/NewFolderForm";
import "./ImageModal.css";

export default function ImageModal({ open, mode: initialMode = "preview", image, onClose, onSave, onDelete }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    if (open) setMode(initialMode);
  }, [open, initialMode]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="image-modal-box">
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