import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

const UserPageScreen = (props) => {
    return (
        <div className="container">
            <div className="UserPage">

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
                        {/*To link to upload game*/}
                        <Link to="/games">
                            <img alt="uh" src="https://picsum.photos/300" />
                        </Link>
                        < div className="textCenter">
                            This will be the add game button
                        </div>
                    </p>
                </section>



            </div>

        </div>
    )
}