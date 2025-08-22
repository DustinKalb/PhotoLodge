"use client";

import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext.jsx";
import ImageModal from "./ImageModal";
import FloatingActionButton from "./FloatingActionButton.jsx";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

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
  // ...existing code...
  fetch(`http://ec2-54-146-16-230.compute-1.amazonaws.com:8080/api/posts/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setImages(data.data);
      });
  fetch(`http://ec2-54-146-16-230.compute-1.amazonaws.com:8080/api/folders/user/${userId}`)
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
      <div style={{ margin: "20px 5px 0 5px", color: "tan", display: "flex", alignItems: "center" }}>
        <h5 style={{ margin: 0, marginRight: 12 }}>Folders</h5>
        <button
          onClick={handleNewFolderClick}
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "none",
            background: "tan",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 4,
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Add Folder"
        >
          <AddIcon style={{ color: "black", fontSize: 15 }} />
        </button>
      </div>
      <br/>
      {/* Folder icons row */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {folders.map(folder => (
          <Link key={folder._id} href={`/folder/${folder._id}`} style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 16px", cursor: "pointer" }}>
              <FolderRoundedIcon style={{ color: "white", fontSize: 64, marginBottom: 4 }} />
              <span style={{ color: "white", fontWeight: 500, fontSize: 14, lineHeight: 1.2 }}>{folder.name}</span>
            </div>
          </Link>
        ))}
      </div>
      <br/>
      {/* Untagged images section */}
      {untaggedImages.length > 0 && (
        <>
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
        onSave={() => {
          fetchImages();
          setModalOpen(false);
        }}
        onDelete={() => {
          fetchImages();
          setModalOpen(false);
        }}
      />
      <div style={{ position: "fixed", bottom: 32, right: 32 }}>
        <FloatingActionButton onClick={handleUploadClick} />
      </div>
    </>
  );
}