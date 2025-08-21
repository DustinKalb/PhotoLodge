"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageModal from "../../../components/ImageModal";
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
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
        style={{ position: "absolute", top: -11, left: 145, zIndex: 10, color: "tan" }}
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
      <h5 style={{ margin: "20px 5px", color: "#E3E3E3" }}>Images in this Folder</h5>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {images.map(img => (
          <div
            key={img._id}
            style={{ width: "200px", height: "200px", overflow: "hidden", borderRadius: "8px", cursor: "pointer" }}
            onClick={() => handleImageClick(img)}
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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