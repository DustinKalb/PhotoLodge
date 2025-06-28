"use client";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "8px 12px",
        fontSize: "1rem",
        borderRadius: "25px",
        border: "1px solid #ccc",
        background: "#fff",
        color: "#222"
      }}
    />
  );
}