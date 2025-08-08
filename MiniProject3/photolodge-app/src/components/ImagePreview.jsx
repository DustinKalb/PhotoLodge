export default function ImagePreview({ image, onClose }) {
  if (!image) return null;
  return (
    <div>
      <img src={image.imageUrl} alt={image.name} style={{ maxWidth: "100%" }} />
      <h2>{image.title}</h2>
      <p>{image.description}</p>
      <div>
        {image.tags?.map(tag => (
          <span key={tag}>#{tag} </span>
        ))}
      </div>
    </div>
  );
}