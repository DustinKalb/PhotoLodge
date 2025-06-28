import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSearch } from "../context/SearchContext.jsx";
import SearchBar from './SearchBar';
import SettingsIcon from '@mui/icons-material/SettingsRounded';

{/* My NavBar component imported from Material UI, imported a few icons as well */}
function NavBar() {
  const { search, setSearch } = useSearch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{ backgroundColor: "rgb(18, 18, 18)" }} elevation={0}>
        <Toolbar>
          <img
            src="/images/photolodgelogo.png"
            alt="PhotoLodge Logo"
            width={30}
            height={30}
            style={{ marginRight: 12 }}
          />
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Photo<span style={{ color: "tan", fontStyle: "italic" }}>Lodge</span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: 400, maxWidth: "100%" }}>
              <SearchBar value={search} onChange={setSearch} />
            </Box>
          </Box>
          <Button color="inherit"><SettingsIcon /></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;