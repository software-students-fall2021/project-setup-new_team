import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './NavBar.css';

const NavBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className = 'appbar'>
        <Toolbar className = "toolbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <MenuIcon />
          </IconButton>
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

