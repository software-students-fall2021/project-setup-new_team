import React, { useState, useEffect } from 'react';
//import axios from 'axios';

//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Link	from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './UserPage.css'
import Upload from './Upload.js'
import './Upload.css'
const UserPage = (props) => {
    const[openPop, setOpenPop] = useState(false);

    const togglePopup = () => {
        setOpenPop(!openPop);
    
    }
    return (
        <div className="container">
            <div className="UserPage">
                <div className="profilePic">
                    <AccountCircleIcon/>
                </div>
                <h1>Username</h1>

                {/*Wrapper for person's games*/}
                <section className="yourGames">
                    <div className="textCenter">
                        <a href='/game'>
                            Person's first game, title here
                        </a>
                    </div>

                    {/*body for first game-image*/}
                    <p>
                        {/*clickable image*/}
                        <Link to="/games">
                            <img alt="uh" src="https://picsum.photos/300" />
                        </Link>
                    </p>
                    <br />
                    {/*header for second game-right justified*/}
                    <div className='textCenter'>
                        <a href='/games' className='bannerClass fontSizeLarge'>
                             Person's second game, title here
                        </a>
                    </div>

                    {/*body for second game-image on right*/}
                    <p className="textLeft">
                        {/*clickable image*/}
                        <Link to="/games">
                            <img alt="uh" src="https://picsum.photos/300" />
                        </Link>
                    </p>


                    <br />

                    <p>
                        {/*New game button*/}
                        <div>
                        <input
                            type="button"
                            value="New Game"
                            onClick={togglePopup}
                            />
                            
                            {openPop && <Upload
                            content={<>
                                <b>Design your Popup</b>
                                <button>Choose files</button>
                            </>}
                            handleClose={togglePopup}
                            />}
                        </div>
                    </p>
                </section>
            </div>
        </div>
    )
}

export default UserPage