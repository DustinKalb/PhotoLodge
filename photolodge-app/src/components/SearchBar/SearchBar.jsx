"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="searchbar-root">
      <SearchRoundedIcon className="searchbar-icon" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="searchbar-input"
      />
    </div>
  );
}