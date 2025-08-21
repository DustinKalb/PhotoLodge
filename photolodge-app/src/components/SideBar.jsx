"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from '@mui/icons-material/HomeRounded';
import BurstModeIcon from '@mui/icons-material/BurstModeRounded';
import Button from "@mui/material/Button";

export default function SideBar() {
  const path = usePathname();
  return (
    <div style={{
      width: 220,
      background: "rgb(18,18,18)",
      color: "#fff",
      padding: "24px 0",
      height: "75vh",
    }}>
      <nav>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link href="/" passHref>
            <Button
              fullWidth
              startIcon={<HomeIcon />}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                padding: '12px 20px',
                background: path === '/' ? 'rgba(210,180,140,0.5)' : 'transparent',
                color: path === '/' ? 'white' : '#e3e3e3',
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 16,
                width: '90%',
                margin: '0 auto',
              }}
            >
              Home
            </Button>
          </Link>
          <Link href="/all-files" passHref>
            <Button
              fullWidth
              startIcon={<BurstModeIcon />}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                padding: '12px 20px',
                background: path.startsWith('/all-files') ? 'rgba(210,180,140,0.5)' : 'transparent',
                color: path.startsWith('/all-files') ? 'white' : '#e3e3e3',
                borderRadius: 2,
                fontWeight: 500,
                fontSize: 16,
                width: '90%',
                margin: '0 auto',
              }}
            >
              All Files
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}