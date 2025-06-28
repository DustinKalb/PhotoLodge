"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <SearchRoundedIcon
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#888",
          pointerEvents: "none"
        }}
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 12px 8px 40px",
          fontSize: "1rem",
          borderRadius: "25px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          color: "white"
        }}
      />
    </div>
  );
}