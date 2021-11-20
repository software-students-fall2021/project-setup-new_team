import React from 'react';

import { Link }     from 'react-router-dom';
import Menu         from '@mui/material/Menu';
import MenuItem     from '@mui/material/MenuItem';


/* i've chosen to pass the callbacks down a level instead of reimporting everything -DC*/
const refreshPage = () => {
    localStorage.removeItem("loginToken");
    window.location.reload(false);
}
const IconMenu = ({ anchor, onClose, open}) => {
    return (
        <Menu
            id       = "basic-menu"
            anchorEl = {anchor}
            open     = {open}
            onClose  = {onClose}
            MenuListProps = {{
                'aria-labelledby' : 'basic-button',
            }}
        >
            {/* this is where we'll assign links to each of the buttons */}
            
            <Link to="/user"><MenuItem onClick={onClose}>Profile</MenuItem></Link>
            <Link to="/user"><MenuItem onClick={onClose}> Login </MenuItem></Link>
            <MenuItem onClick={() => {refreshPage(); onClose();}}> Logout </MenuItem>
            <Link to="/register"><MenuItem onClick={onClose}> Register </MenuItem></Link>
        </Menu>
    );
}


export default IconMenu;