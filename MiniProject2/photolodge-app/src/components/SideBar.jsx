"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/HomeRounded';
import BurstModeIcon from '@mui/icons-material/BurstModeRounded';
import Link from "next/link";
import { usePathname } from "next/navigation";

{/* This is my sidebar component, very simple, uses Material UI with some minor styling changes */}
export default function BasicList() {
    const path = usePathname();
  return (
    <Box sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton
            component={Link}
            href="/"
            selected={path === "/"}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
             <ListItemText primary="Home"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
            component={Link}
            href="/all-files"
            selected={path.startsWith("/all-files")}>
              <ListItemIcon>
                <BurstModeIcon />
              </ListItemIcon>
              <ListItemText primary="All Files" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}