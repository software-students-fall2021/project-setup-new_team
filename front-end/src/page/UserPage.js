import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './UserPage.css'
import Upload from './Upload.js'

const clip_title = (data) => {
    if (data.length > 30) {
        return data.substring(0, 30) + "..."
    }
    return data
}
const randInt = () =>{
    return Math.floor(Math.random() * 1e12)
}
const UserPage = (props) => {
    const jwtToken = localStorage.getItem("loginToken")

    const user = useParams();
    const[openPop, setOpenPop] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [uploadMessage, setUploadMessage] = React.useState('');
    const[userGames, setUserGames] = React.useState([]);
    const[userName, setUserName] = React.useState('');
    const[gamePostSuccess, setGamePostSuccess] = React.useState(1);
    //For making popup work
    const togglePopup = () => {
        setOpenPop(!openPop);
    }

    function getQuery(args){
        return new Promise((resolve, reject) => {
              axios.get(`http://localhost:3000/${args}`)
              .then(res => {resolve(res.data)})
              .catch(err => {console.log(err); reject(err)})
          })
    }
    
   
    useEffect(() => {
        const decodedToken = jwt.decode(jwtToken)
        async function getPageData(){
            setUserGames([]);
            try{
                const name = await getQuery(`username/${user.id}`);
                setUserName(name.username)
            }catch(err){
                setUserName("404: User Not Found")
                return
            }
            const gamelist = await getQuery(`user_games/${user.id}`);
            console.log(gamelist)
            if(!gamelist){
                return;
            }
            //add each game in gameslist to userGames
            gamelist.map(game => {
                return {
                    id: game.id,
                    title: game.title,
                    description: game.description,
                    thumb: game.thumb,
                    userid: game.userid,
                    path: game.path
                }
            }).forEach(game => {
                setUserGames(userGames => [...userGames, game])
            })

        }
        console.log("getting page data")
        getPageData()
         // eslint-disable-next-line
        if(decodedToken && user.id == decodedToken.id){//yes it's supposed to be comparing equality WITH casting
            setShowUpload(true)
        }
    }, [jwtToken, user.id, gamePostSuccess])

    const handleSubmit = (event) => {
        event.preventDefault();
        //send data to server
        const bodyFormData = new FormData();
        bodyFormData.set('id',randInt())
        bodyFormData.set('title', event.target.title.value);
        bodyFormData.set('description', event.target.description.value);
        bodyFormData.set('thumbnail', event.target.thumbnail.files[0]);
        //append all game_files to bodyFormData
        for(let i = 0; i < event.target.game_files.files.length; i++){
            bodyFormData.append('game_files', event.target.game_files.files[i]);
        }
        axios.post(`http://localhost:3000/upload/${user.id}`, bodyFormData, {
            headers: { Authorization: `JWT ${jwtToken}`,
                        'Content-Type': 'multipart/form-data'}, //need to change the request args
        })
        .then(function (response) {
          //give success message
          console.log(response);
          setUploadMessage(response.data.status);
          setOpenPop(false)
          setGamePostSuccess(gamePostSuccess + 1)
        })
        .catch(function (error) {
          //give error message
          console.log(error);
          setUploadMessage(error.response.data.status);
        });
    }
    return (
        <div className="container">
            <div className="UserPage">
                <div className="profilePic">
                    <AccountCircleIcon/>
                </div>
                <h1>{userName}</h1> 
                {!userGames.length && <h2>Try uploading a game!</h2>}
                {
                    userGames.map((game,index) => {
                        return (
                            <Link to={`/games/${game.id}`}>
                                <h2>{clip_title(game.title)}</h2>
                                {<img src={`http://localhost:3000/static/images/${game.thumb}`} alt={game.title} className="userImageCenter"/>}
                            </Link>
                        )
                    })
                }
                {/*Wrapper for person's games*/}

                   

                    <br />

                    <div>
                        {/*New game button*/}
                        {showUpload && <input type="button"  value="New Game"  onClick={togglePopup} />}
                            
                            {openPop && <Upload
                            content={<>
                                <form action="http://localhost:3000/upload" method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <input type="text" placeholder="Title" name="title" required/>
                                    <br/>
                                    <br/>
                                    <label>
                                        Select game files:
                                        <input type="file" placeholder="File" name="game_files" webkitdirectory="true" required/>
                                    </label>
                                    <input type="text" placeholder="Description" name="description" required/>
                                    <br/>
                                    <br/>
                                    <label>
                                        Choose Thumbnail:
                                        <input type="file" placeholder="Thumbnail" name="thumbnail" required/>
                                    </label>
                                    {/* unique ID */}
                                    <input type="submit" value="Upload" className="upload-button"/>

                                    <p>{uploadMessage}</p>
                                </form> 
                                
                            </>}
                            handleClose={togglePopup}
                            />}
                    </div>
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