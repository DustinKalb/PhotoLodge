"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageModal from "../../../components/ImageModal";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function FolderImagesPage() {
  const { folderId } = useParams();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("preview");
  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/folder/${folderId}`)
      .then(res => res.json())
      .then(data => setImages(data.data || []));
  }, [folderId]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setModalMode("preview");
    setModalOpen(true);
  };

  const handleEdit = () => {
    setModalMode("edit");
  };

  const handleDelete = async () => {
    if (!selectedImage) return;
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    await fetch(`http://localhost:8080/api/posts/${selectedImage._id}`, {
      method: "DELETE",
    });
    setImages(images.filter(img => img._id !== selectedImage._id));
    setModalOpen(false);
  };

  const handleSave = () => {
    // After editing, refresh images
    fetch(`http://localhost:8080/api/posts/folder/${folderId}`)
      .then(res => res.json())
      .then(data => setImages(data.data || []));
    setModalOpen(false);
  };

  // Delete the folder
  const handleDeleteFolder = async () => {
    await fetch(`http://localhost:8080/api/folders/${folderId}`, {
      method: "DELETE",
    });
    router.push("/");
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Trashcan icon in top right */}
      <IconButton
        onClick={() => setDialogOpen(true)}
        style={{ position: "absolute", top: 8, right: 8, zIndex: 10, color: "#b71c1c" }}
        aria-label="Delete Folder"
      >
        <DeleteOutlineRoundedIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Folder?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this folder (Contained images will not be deleted)? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              setDialogOpen(false);
              await handleDeleteFolder();
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <h2>Images in this Folder</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {images.map(img => (
          <img
            key={img._id}
            src={img.imageUrl}
            alt={img.title}
            style={{ width: 200, height: 200, objectFit: "cover", cursor: "pointer" }}
            onClick={() => handleImageClick(img)}
          />
        ))}
      </div>
      <ImageModal
        open={modalOpen}
        mode={modalMode}
        image={selectedImage}
        onClose={() => setModalOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </div>
  );
}