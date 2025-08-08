"use client"

import { SearchProvider } from "../context/SearchContext.jsx";
import NavBar from '../components/NavBar.jsx' // see next slide
import SideBar from "../components/SideBar.jsx"
import MuiProvider from "../components/MuiProvider.jsx";
import FloatingActionButton from "../components/FloatingActionButton.jsx";
import './globals.css'
import { Inter } from 'next/font/google' // supports google fonts
import { useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [search, setSearch] = useState("");
// Root layout must render the <html> and <body> elements
return (
<html lang="en">
  <body className={inter.className}>
    <MuiProvider>
      <SearchProvider>
      <NavBar/>
      <div style={{ display: "flex", height: "calc(100vh - 64px" }}>
      <SideBar/>
      <main style={{ background: "rgba(255,255,255,0.08)", borderRadius: "10px", flexGrow: 1, margin: "0 20px 20px 0", padding: "20px", overflow: "auto" }}>
      {children}
      </main>
      </div>
      </SearchProvider>
    </MuiProvider>
  </body>
</html>
)
}