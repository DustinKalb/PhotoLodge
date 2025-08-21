"use client";

import { useEffect, useState } from "react";
const apiBase = process.env.NEXT_PUBLIC_API_URL;
import { useParams, useRouter } from "next/navigation";
import ImageModal from "../../../components/ImageModal/ImageModal";
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import './page.css';

export default function FolderImagesPage() {
  const { folderId } = useParams();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("preview");
  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
  fetch(`${apiBase}/api/posts/folder/${folderId}`)
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
    await fetch(`${apiBase}/api/posts/${selectedImage._id}`, {
      method: "DELETE",
    });
    setImages(images.filter(img => img._id !== selectedImage._id));
    setModalOpen(false);
  };

  const handleSave = () => {
    // After editing, refresh images
  fetch(`${apiBase}/api/posts/folder/${folderId}`)
      .then(res => res.json())
      .then(data => setImages(data.data || []));
    setModalOpen(false);
  };

  // Delete the folder
  const handleDeleteFolder = async () => {
    await fetch(`${apiBase}/api/folders/${folderId}`, {
      method: "DELETE",
    });
    router.push("/");
  };

  return (
    <div className="folder-page-root">
      {/* Trashcan icon in top right */}
      <IconButton
        onClick={() => setDialogOpen(true)}
        className="folder-page-trash-btn"
        aria-label="Delete Folder"
      >
        <DeleteRoundedIcon />
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
      <h5 className="folder-page-title">Images in this Folder</h5>
      <div className="folder-page-gallery">
        {images.map(img => (
          <div
            key={img._id}
            className="folder-page-image-card"
            onClick={() => handleImageClick(img)}
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="folder-page-image"
            />
          </div>
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