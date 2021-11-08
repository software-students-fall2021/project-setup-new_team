import React, { useState, useEffect } from 'react';
import axios from 'axios';

//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Link	from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './UserPage.css'
import Upload from './Upload.js'

const clip_title = (data) => {
    if (data.length > 30) {
        return data.substring(0, 30) + "..."
    }
    return data
}

const UserPage = (props) => {
    const[openPop, setOpenPop] = useState(false);
    const [uploadMessage, setUploadMessage] = React.useState('');
    const[userGames, setUserGames] = React.useState([]);

    //For making popup work
    const togglePopup = () => {
        setOpenPop(!openPop);
    
    }

    function getQuery(args){
        return new Promise((resolve, reject) => {
              axios.get(`http://localhost:3000/${args}`)
              .then(res => {resolve(res.data)})
              .catch(err => {console.log(err)})
          })
    }

    async function getPageData(){
        const gamelist = await getQuery(`user_games/${'userid'}`);
        const game1 = await getQuery(`games_data/${gamelist.id1}`);
        const game2 = await getQuery(`games_data/${gamelist.id2}`);
        setUserGames([game1, game2])
    }
    useEffect(() => {
        console.log("getting page data")
        getPageData()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        //send data to server
        axios.post('http://localhost:3000/upload', {
          title: event.target.title.value,
          file: event.target.file.value,
          description: event.target.description.value,
          imageid: event.target.imageid.value
          //unique ID
        })
        .then(function (response) {
          //give success message
          console.log(response);
          setUploadMessage(response.data.status);
        })
        .catch(function (error) {
          //give error message
          console.log(error);
          setUploadMessage(error.response.data.error);
        });
    }
    if(userGames.length < 2){return <div>Loading...</div>}
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
                        {clip_title(userGames[0].title)}
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
                    {/*header for second game-right*/}
                    <div className='textCenter'>
                        <a href='/games' className='bannerClass fontSizeLarge'>
                             {clip_title(userGames[1].title)}
                        </a>
                    </div>

                    {/*body for second game-image*/}
                    <p className="textCenter">
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
                                <form action="http://localhost:3000/upload" method="POST" onSubmit={handleSubmit}>
                                    <input type="text" placeholder="Title" name="title" required/>
                                    <br/>
                                    <br/>
                                    <label>
                                        Select game files:
                                        <input type="file" placeholder="File" name="file" required/>
                                    </label>
                                    <input type="text" placeholder="Description" name="description" required/>
                                    <br/>
                                    <br/>
                                    <label>
                                        Choose Thumbnail:
                                        <input type="file" placehodler="Thumbnail" name="thumbnail" required/>
                                    </label>
                                    {/* unique ID */}
                                    <input type="submit" value="Upload" className="upload-button"/>
                                </form> 
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

/*      THIS IS THE USERPAGE UI FOR WHEN WE ARE GETTING DATA

const clip_title = (data) => {
    if (data.length > 30) {
        return data.substring(0, 30) + "..."
    }
    return data
}

const Home = (props) => {
  const [featuredData, setFeaturedData] = React.useState([]); //actual data for page
  function getQuery(args){
      return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/${args}`)
            .then(res => {resolve(res.data)})
            .catch(err => {console.log(err)})
        })
  }
  async function getPageData(){
        const userGames = await getQuery("users_games/${userid}")

  }
  useEffect(() => {
     console.log("getting page data")
     getPageData()
  }, [])

  <div className="container">
            <div className="UserPage">
                <div className="profilePic">
                    <AccountCircleIcon/>
                </div>
                <h1>Username</h1>

                {Wrapper for person's games}
                <section className="yourGames">
                    <div className="textCenter">
                        <a href='/game'>
                            userGames[0].title
                        </a>
                    </div>

                    {body for first game-image}
                    <p>
                        {clickable image}
                        <Link to="/games">
                            userGames[0].thumbnail
                        </Link>
                    </p>
                    <br />
                    {header for second game-right}
                    <div className='textCenter'>
                        <a href='/games' className='bannerClass fontSizeLarge'>
                             userGames[1].title
                        </a>
                    </div>

                    {body for second game-image}
                    <p className="textCenter">
                        {clickable image}
                        <Link to="/games">
                            userGames[1].thumbnail
                        </Link>
                    </p>


                    <br />

                    <p>
                        {/*New game button}
                        <div>
                        <input
                            type="button"
                            value="New Game"
                            onClick={togglePopup}
                            />
                            
                            {openPop && <Upload
                            content={<>
                                <form action="http://localhost:3000/upload" method="POST" onSubmit={handleSubmit}>
                                    <input type="title" placeholder="Title" name="title" required/>
                                    <input type="file" placeholder="File" name="file" required/>
                                    <input type="description" placeholder="Description" name="description" required/>
                                    {/*This will be an image instead of text once we start on db}
                                    <input type="thumbnail" placehodler="Thumbnail" name="thumbnail" required/>
                                    {/* unique ID }
                                    <input type="submit" value="Upload" className="upload-button"/>
                                </form> 
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

*/ 