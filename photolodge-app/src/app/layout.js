"use client"

import { SearchProvider } from "../context/SearchContext.jsx";
import NavBar from '../components/NavBar.jsx';
import SideBar from "../components/SideBar.jsx";
import MuiProvider from "../components/MuiProvider.jsx";
import FloatingActionButton from "../components/FloatingActionButton.jsx";
import './globals.css';
import { Inter } from 'next/font/google';
import { useState } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/sign-up";

  // Root layout must render the <html> and <body> elements
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiProvider>
          <SearchProvider>
            {isAuthPage ? (
              children // Only render login and sign-up page content
            ) : (
              <>
                <NavBar />
                <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
                  <SideBar />
                  <main
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      flexGrow: 1,
                      margin: "0 20px 20px 0",
                      padding: "20px",
                      overflow: "auto"
                    }}
                  >
                    {children}
                  </main>
                </div>
              </>
            )}
          </SearchProvider>
        </MuiProvider>
      </body>
    </html>
  )
}