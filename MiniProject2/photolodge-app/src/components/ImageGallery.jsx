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
    const saved = localStorage.getItem("images");
    if (saved) {
      setImages(JSON.parse(saved));
    } else {
      fetch("/images.json")
        .then(res => res.json())
        .then(data => {
          setImages(data);
          localStorage.setItem("images", JSON.stringify(data));
        });
    }
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

  {/* Save image to local storage, some code I found online that I decided to have fun with even though it wasn't required */}
  function handleSaveImage(newImage) {
    if (newImage.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedImages = [
          ...images,
          {
            ...newImage,
            id: images.length + 1,
            src: e.target.result
          }
        ];
        setImages(updatedImages);
        localStorage.setItem("images", JSON.stringify(updatedImages));
        setModalOpen(false);
      };
      reader.readAsDataURL(newImage.file);
    }
  }


  {/* Filter images by search term (tags or description) */}
  const filteredImages = search.trim()
    ? images.filter(img => {
        const term = search.toLowerCase();
        const tags = (img.tags || []).join(" ").toLowerCase();
        const desc = (img.description || "").toLowerCase();
        return tags.includes(term) || desc.includes(term);
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
                key={img.id}
                style={{ width: "200px", height: "200px", overflow: "hidden", borderRadius: "8px", cursor: "pointer" }}
                onClick={() => handleImageClick(img)}
              >
                <img
                  src={img.src}
                  alt={img.name}
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
            key={img.id}
            style={{ width: "200px", height: "200px", overflow: "hidden", borderRadius: "8px", cursor: "pointer" }}
            onClick={() => handleImageClick(img)}
          >
            <img
              src={img.src}
              alt={img.name}
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
        onSave={handleSaveImage}
      />
      <div style={{ position: "fixed", bottom: 32, right: 32 }}>
        <FloatingActionButton onClick={handleUploadClick} />
      </div>
    </>
  );
}