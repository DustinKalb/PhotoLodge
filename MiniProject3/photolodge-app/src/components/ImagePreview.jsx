import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

export default function ImagePreview({ image, onClose, onEdit, onDelete }) {
  if (!image) return null;

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
        onClick={async () => {
          await fetch(`http://localhost:8080/api/posts/${image._id}`, { method: "DELETE" });
          if (onDelete) onDelete();
        }} style={{color: "tan"}}
      >
        <DeleteIcon />
      </Button>
      </div>
    </div>
  );
}