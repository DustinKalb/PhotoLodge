import Modal from '@mui/material/Modal';
import UploadForm from "./UploadForm.jsx";
import ImagePreview from "./ImagePreview.jsx";
import EditForm from "./EditForm.jsx";
import { useSpring, animated } from '@react-spring/web';

{/* Component for modal that handles either image upload or preview */}

export default function ImageModal({ open, mode, image, onClose, onSave, onEdit }) {
  const fade = useSpring({
    opacity: open ? 1 : 0,
    config: { tension: 300, friction: 30 },
    pointerEvents: open ? 'auto' : 'none'
  });

  return (
    <Modal open={open} onClose={onClose}>
      <animated.div
        style={{
          ...fade,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          padding: "24px",
          minWidth: 320,
          maxWidth: 480,
          width: "90%",
          outline: "none",
          color: "black",
        }}
      >
        {mode === "upload" ? (
          <UploadForm onSave={onSave} onClose={onClose} />
        ) : mode === "edit" ? (
          <EditForm post={image} onSave={onSave} onClose={onClose} />
        ) : (
          <ImagePreview image={image} onClose={onClose} onEdit={onEdit} />
        )}
      </animated.div>
    </Modal>
  );
}