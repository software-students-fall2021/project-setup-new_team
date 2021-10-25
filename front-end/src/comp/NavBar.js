import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import BurgerMenu from './BurgerMenu';

import './NavBar.css';

const NavBar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
		<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className = 'appbar'>
        <Toolbar className = "toolbar">
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
              <BurgerMenu anchor = {anchorEl} onClose = {handleClose} open = {open} />
          </div>
          <Typography className = "title" variant="h5" component="div"> 
            Project Title 
          </Typography>
          <IconButton className = "profile-icon"
            size="large"
            edge="start"
            color="inherit"
            aria-label="profile"
            sx={{ mr: 0 }}>
            <AccountCircleIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>

	);
}

export default NavBar;

