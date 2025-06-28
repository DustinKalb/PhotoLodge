"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingActionButton({ onClick }) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab aria-label="add" sx={{ backgroundColor: "tan" }} onClick={onClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}