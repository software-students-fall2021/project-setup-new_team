import React from 'react';

import { Link }     from 'react-router-dom';
import Menu         from '@mui/material/Menu';
import MenuItem     from '@mui/material/MenuItem';

/* i've chosen to pass the callbacks down a level instead of reimporting everything -DC*/
const BurgerMenu = ({ anchor, onClose, open}) => {
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
            <MenuItem onClick={onClose}>Home</MenuItem>
            <MenuItem onClick={onClose}>Games</MenuItem>
            <MenuItem onClick={onClose}>Articles</MenuItem>
            <MenuItem onClick={onClose}>Forums</MenuItem>
            <MenuItem onClick={onClose}>About</MenuItem>
        </Menu>
    );
}


export default BurgerMenu;