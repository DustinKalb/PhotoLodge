"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  }
});

{/* Material UI provider, wrapped around my css baseline to prevent errors */}

export default function MuiProvider({ children }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
