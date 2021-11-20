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
            <Link to="/"><MenuItem onClick={onClose}>Home</MenuItem> </Link>
            <Link to = "/games"><MenuItem onClick={onClose}>Games</MenuItem></Link>
            <Link to="/articles"><MenuItem onClick={onClose}>Articles</MenuItem></Link>
        </Menu>
    );
}


export default BurgerMenu;