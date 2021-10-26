import React from 'react';

import { Link }     from 'react-router-dom';
import Menu         from '@mui/material/Menu';
import MenuItem     from '@mui/material/MenuItem';

/* i've chosen to pass the callbacks down a level instead of reimporting everything -DC*/
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
            <Link to="/userpage"><MenuItem onClick={onClose}>UserPage</MenuItem> </Link>
            <MenuItem onClick={onClose}>Logout</MenuItem>
        </Menu>
    );
}


export default IconMenu;