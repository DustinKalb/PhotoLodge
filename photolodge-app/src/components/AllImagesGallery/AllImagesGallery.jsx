"use client";

import { useEffect, useState } from "react";
const apiBase = process.env.NEXT_PUBLIC_API_URL;
import { useSearch } from "../../context/SearchContext.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import FloatingActionButton from "../FloatingActionButton/FloatingActionButton.jsx";
import "./AllImagesGallery.css";

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
    fetch(`http://ec2-54-146-16-230.compute-1.amazonaws.com:8080/api/posts/user/${userId}?t=${Date.now()}`)
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
      <div className="all-images-header">
        <h5>All Files</h5>
      </div>
      <div className="all-images-gallery">
        {filteredImages.map((img) => (
          <div
            key={img._id}
            className="all-images-gallery-item"
            onClick={() => handleImageClick(img)}
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="all-images-gallery-img"
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
      <div className="all-images-fab-container">
        <FloatingActionButton onClick={handleUploadClick} />
      </div>
    </>
  );
}

// Simple unit test for filter logic
if (typeof window === 'undefined') {
  const images = [
    { title: 'Sunset', tags: ['nature'], description: 'A beautiful sunset.' },
    { title: 'Dog', tags: ['pet'], description: 'A cute dog.' },
  ];
  const search = 'dog';
  const filtered = search.trim()
    ? images.filter(img => {
        const term = search.toLowerCase();
        const tags = (img.tags || []).join(' ').toLowerCase();
        const desc = (img.description || '').toLowerCase();
        const title = (img.title || '').toLowerCase();
        return tags.includes(term) || desc.includes(term) || title.includes(term);
      })
    : images;
  if (filtered.length !== 1 || filtered[0].title !== 'Dog') {
    throw new Error('Filter logic unit test failed');
  }
}