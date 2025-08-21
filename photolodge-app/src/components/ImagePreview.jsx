import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";

export default function ImagePreview({ image, onClose, onEdit, onDelete }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!image) return null;

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/api/posts/${image._id}`, { method: "DELETE" });
    if (onDelete) onDelete();
  };

  return (
    <div>
      <img src={image.imageUrl} alt={image.title} style={{ maxWidth: "100%" }} />
      <h2>{image.title}</h2>
      <p>{image.description}</p>
      <div>
        {image.tags?.map((tag, i) => (
          <span key={tag + i}>#{tag} </span>
        ))}
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button onClick={onEdit} style={{color: "tan"}}>
          <EditRoundedIcon />
        </Button>
        <Button
          onClick={() => setDialogOpen(true)}
          style={{color: "tan"}}
        >
          <DeleteIcon />
        </Button>
      </div>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Image?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this image? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}