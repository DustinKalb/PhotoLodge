"use client";

import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext.jsx";
import ImageModal from "./ImageModal";
import FloatingActionButton from "./FloatingActionButton.jsx";

export default function AllImagesGallery() {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("preview");
  const [selectedImage, setSelectedImage] = useState(null);
  const { search } = useSearch();

  // Fetch images from backend API
  const fetchImages = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    fetch(`http://localhost:8080/api/posts/user/${userId}?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        setImages(data.data);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setModalMode("preview");
    setModalOpen(true);
  };

  const handleUploadClick = () => {
    setSelectedImage(null);
    setModalMode("upload");
    setModalOpen(true);
  };

  // Filter images by search term (tags, description, title)
  const filteredImages = search.trim()
    ? images.filter(img => {
        const term = search.toLowerCase();
        const tags = (img.tags || []).join(" ").toLowerCase();
        const desc = (img.description || "").toLowerCase();
        const title = (img.title || "").toLowerCase();
        return tags.includes(term) || desc.includes(term) || title.includes(term);
      })
    : images;

  return (
    <>
      <div style={{ margin: "20px 5px", color: "#e3e3e3"}}>
        <h5>All Files</h5>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filteredImages.map((img) => (
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
        onSave={() => {
          fetchImages();
          setModalOpen(false);
        }}
        onDelete={() => {
          fetchImages();
          setModalOpen(false);
        }}
      />
  <div style={{ position: "fixed", bottom: 32, right: 50 }}>
        <FloatingActionButton onClick={handleUploadClick} />
      </div>
    </>
  );
}