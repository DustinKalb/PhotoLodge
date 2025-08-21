import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSearch } from "../../context/SearchContext.jsx";
import SearchBar from '../SearchBar/SearchBar.jsx';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useRouter } from "next/navigation";
import './NavBar.css';

{/* My NavBar component imported from Material UI, imported a few icons as well */}
function NavBar() {
  const { search, setSearch } = useSearch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  // Get username from localStorage (client-side only)
  const [username, setUsername] = React.useState("");
  React.useEffect(() => {
    // This runs only on the client
    setUsername(localStorage.getItem("username") || "");
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    handleMenuClose();
    router.push("/login");
  };

  return (
    <Box className="navbar-root">
      <AppBar position="static" color="transparent" className="navbar-appbar" elevation={0}>
        <Toolbar className="navbar-toolbar">
          <img
            src="/images/photolodgelogo.png"
            alt="PhotoLodge Logo"
            width={40}
            height={40}
            className="navbar-logo"
          />
          <Typography variant="h6" component="div" className="navbar-title">
            Photo<span className="navbar-title-tan">Lodge</span>
          </Typography>
          <Box className="navbar-search-container">
            <Box className="navbar-search-inner">
              <SearchBar value={search} onChange={setSearch} />
            </Box>
          </Box>
          <span className="navbar-username">{username}</span>
          <IconButton onClick={handleMenuOpen} className="navbar-account-btn">
            <AccountCircleRoundedIcon fontSize="large" className="navbar-account-icon" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;