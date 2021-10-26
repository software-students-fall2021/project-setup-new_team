import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import BurgerMenu from './BurgerMenu';
import IconMenu from './IconMenu';

import './NavBar.css';

const NavBar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorUser, setAnchorUser] = React.useState(null);
  const open = Boolean(anchorEl); 
  const openUser = Boolean(anchorUser)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickUser = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const closeUser = () => {
    setAnchorUser(null);
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
          <div>
            <IconButton className = "profile-icon"
              size="large"
              edge="start"
              color="inherit"
              aria-label="profile"
              sx={{ mr: 0 }}
              onClick={clickUser}
            >
              <AccountCircleIcon/>
            </IconButton>
              <IconMenu anchor = {anchorUser} onClose = {closeUser} open = {openUser} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>

	);
}

export default NavBar;

