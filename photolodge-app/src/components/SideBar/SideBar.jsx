"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/HomeRounded';
import BurstModeIcon from '@mui/icons-material/BurstModeRounded';
import Button from "@mui/material/Button";
import './SideBar.css';

export default function SideBar() {
  const path = usePathname();
  return (
    <div className="sidebar-root">
      <nav>
        <div className="sidebar-links">
          <Link href="/" passHref>
            <Button
              fullWidth
              startIcon={<HomeIcon />}
              className={`sidebar-btn${path === '/' ? ' sidebar-btn-active' : ''}`}
            >
              Home
            </Button>
          </Link>
          <Link href="/all-files" passHref>
            <Button
              fullWidth
              startIcon={<BurstModeIcon />}
              className={`sidebar-btn${path.startsWith('/all-files') ? ' sidebar-btn-active' : ''}`}
            >
              All Files
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}