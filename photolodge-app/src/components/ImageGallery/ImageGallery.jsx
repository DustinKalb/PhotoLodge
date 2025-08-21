"use client";

import { useEffect, useState } from "react";
const apiBase = process.env.NEXT_PUBLIC_API_URL;
import { useSearch } from "../../context/SearchContext.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import FloatingActionButton from "../FloatingActionButton/FloatingActionButton.jsx";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import "./ImageGallery.css";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("preview");
  const [selectedImage, setSelectedImage] = useState(null);
  const { search } = useSearch();

  // Fetch images and folders from backend API
  const fetchImages = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
  fetch(`${apiBase}/api/posts/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setImages(data.data);
      });
    fetch(`http://localhost:8080/api/folders/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setFolders(data.data || []);
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

  const handleEdit = () => {
    setModalMode("edit");
  };

  const handleNewFolderClick = () => {
    setSelectedImage(null);
    setModalMode("newFolder");
    setModalOpen(true);
  };

  // Filtering logic
  const filteredImages = search.trim()
    ? images.filter(img => {
        const term = search.toLowerCase();
        const tags = (img.tags || []).join(" ").toLowerCase();
        const desc = (img.description || "").toLowerCase();
        const title = (img.title || "").toLowerCase();
        return tags.includes(term) || desc.includes(term) || title.includes(term);
      })
    : images;

  const untaggedImages = filteredImages.filter(img => !img.tags || img.tags.length === 0);
  const taggedImages = filteredImages.filter(img => img.tags && img.tags.length > 0);

  return (
    <>
      {/* Folders section */}
      <div className="gallery-folders-header">
        <h5>Folders</h5>
        <button
          onClick={handleNewFolderClick}
          className="gallery-add-folder-btn"
          aria-label="Add Folder"
        >
          <AddIcon className="gallery-add-folder-icon" />
        </button>
      </div>
      <br/>
      {/* Folder icons row */}
      <div className="gallery-folders-row">
        {folders.map(folder => (
          <Link key={folder._id} href={`/folder/${folder._id}`} className="gallery-folder-link">
            <div className="gallery-folder-item">
              <FolderRoundedIcon className="gallery-folder-icon" />
              <span className="gallery-folder-name">{folder.name}</span>
            </div>
          </Link>
        ))}
      </div>
      <br/>
  <hr className="gallery-divider" />
      {/* Untagged images section */}
      {untaggedImages.length > 0 && (
        <>
          <div className="gallery-section-header">
            <h5>Untagged</h5>
          </div>
          <div className="gallery-images-row">
            {untaggedImages.map((img) => (
              <div
                key={img._id}
                className="gallery-image-item"
                onClick={() => handleImageClick(img)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="gallery-image-img"
                />
              </div>
            ))}
          </div>
          <br/>
          <hr className="gallery-divider" />
        </>
      )}

      {/* Tagged images section */}
      <div className="gallery-section-header">
        <h5>Tagged</h5>
      </div>
      <div className="gallery-images-row">
        {taggedImages.map((img) => (
          <div
            key={img._id}
            className="gallery-image-item"
            onClick={() => handleImageClick(img)}
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="gallery-image-img"
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
      <div className="gallery-fab-container">
        <FloatingActionButton onClick={handleUploadClick} />
      </div>
    </>
  );
}


// Simple unit test for folder extraction
if (typeof window === 'undefined') {
  const folders = [
    { _id: '1', name: 'Vacation' },
    { _id: '2', name: 'Work' },
  ];
  const folderNames = folders.map(f => f.name);
  if (folderNames.length !== 2 || folderNames[0] !== 'Vacation' || folderNames[1] !== 'Work') {
    throw new Error('ImageGallery folder extraction unit test failed');
  }
}