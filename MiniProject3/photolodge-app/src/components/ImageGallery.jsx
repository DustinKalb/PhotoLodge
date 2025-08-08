"use client";

import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext.jsx";
import ImageModal from "./ImageModal";
import FloatingActionButton from "./FloatingActionButton.jsx";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("preview"); // "preview" or "upload"
  const [selectedImage, setSelectedImage] = useState(null);
  const { search } = useSearch();


  {/* Fetch images from local storage/json file */}
  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then(res => res.json())
      .then(data => {
        // If your API returns { result: 200, data: [...] }
        setImages(data.data);
      });
  }, []);

  {/* Handles which version of modal to open */}
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

  {/* Filter images by search term (tags or description) */}
  const filteredImages = search.trim()
    ? images.filter(img => {
        const term = search.toLowerCase();
        const tags = (img.tags || []).join(" ").toLowerCase();
        const desc = (img.description || "").toLowerCase();
        const title = (img.title || "").toLowerCase();
        return tags.includes(term) || desc.includes(term) || title.includes(term);
      })
    : images;

  {/* Filter into tagged and untagged sections */}
  const untaggedImages = filteredImages.filter(img => !img.tags || img.tags.length === 0);
  const taggedImages = filteredImages.filter(img => img.tags && img.tags.length > 0);

  return (
    <>
      {untaggedImages.length > 0 && (
        <>
          {/* Untagged images section */}
          <div style={{ margin: "20px 5px", color: "tan" }}>
            <h5>Untagged</h5>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {untaggedImages.map((img) => (
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
        </>
      )}

      {/* Tagged images section */}
      <div style={{ margin: "20px 5px", color: "tan"}}>
        <h5>Tagged</h5>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {taggedImages.map((img) => (
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
        onSave={() => setModalOpen(false)}
      />
      <div style={{ position: "fixed", bottom: 32, right: 32 }}>
        <FloatingActionButton onClick={handleUploadClick} />
      </div>
    </>
  );
}