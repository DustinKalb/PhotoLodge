"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import "./FloatingActionButton.css";

export default function FloatingActionButton({ onClick }) {
  return (
    <Box className="fab-box">
      <Fab aria-label="add" className="fab-tan" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}