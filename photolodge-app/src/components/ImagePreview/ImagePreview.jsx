import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import './ImagePreview.css';

export default function ImagePreview({ image, onClose, onEdit, onDelete }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!image) return null;

  const handleDelete = async () => {
  await fetch(`http://ec2-54-146-16-230.compute-1.amazonaws.com:8080/api/posts/${image._id}`, { method: "DELETE" });
    if (onDelete) onDelete();
  };

  return (
    <div>
  <img src={image.imageUrl} alt={image.title} className="image-preview-img" tabIndex={-1} />
      <h2>{image.title}</h2>
      <div className="image-preview-tags">
        {image.tags?.map((tag, i) => (
          <span
            key={tag + i}
            className="image-preview-tag"
          >
            #{tag}
          </span>
        ))}
      </div>
      <p>{image.description}</p>
      <br/>
      <div className="image-preview-actions">
        <Button onClick={onEdit} className="image-preview-action-btn">
          <EditRoundedIcon />
        </Button>
        <Button
          onClick={() => setDialogOpen(true)}
          className="image-preview-action-btn"
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