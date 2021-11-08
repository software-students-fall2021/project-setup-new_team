import React,{ useState, useEffect } from 'react';
import { styled }    from '@mui/system';
import { useParams } from "react-router-dom";
import Rating        from '@mui/material/Rating';
import Button        from '@mui/material/Button';
import TextField     from '@mui/material/TextField';
import axios from 'axios'
import { Link } from 'react-router-dom'

import SendIcon from '@mui/icons-material/Send';
import GamePreview from './GamePreview';

import Typography from '@mui/material/Typography';

import './Article.css'

const SearchButton = styled(Button)(({ theme }) => ({
    backgroundColor: "darkred",
    '&:hover': {
      backgroundColor: "darkred",
    },
}));

const clip_article = (data) => {
    if (data.length > 440) {
        return data.substring(0, 440) + "..."
    }
    return data
}

const GamesList = (props) => {
    const [searchData, setSearchData] = useState([]);
    const [featureGame, setFeatureGame] = React.useState([]);

    function getQuery(args){
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/games/${args}`)
            .then(res => (resolve(res.data)))
            .catch(err => console.log(err))
        })
    }

    async function getGameList() {
        const gameTitle = await getQuery("1")
        console.log(gameTitle.id)
        const gameTitle2 = await getQuery("2")
        const gameTitle3 = await getQuery("3")
        const gameTitle4 = await getQuery("4")
        const gameTitle5 = await getQuery("5")
        setFeatureGame([gameTitle, gameTitle2, gameTitle3, gameTitle4, gameTitle5])
    }

    useEffect(() => {
        console.log("Games page")
        getGameList()
    }, [])
    
    
    if(featureGame.length < 5) {return <div>Loading...</div>}
    return (    
        <div className = "column">
            <div className = "text-box">
            <TextField 
                    onChange = {(event) => { setSearchData(event.target.value); }}
                    id="outlined-multiline-static"
                    label="Search"
                    Enter a
                    rows={4}
                    defaultValue=""
                />
            </div>
            <div className = "search">
                <SearchButton variant="contained" 
                    /* onClick = {sendCommentData(...)} TODO during back-end */
                    startIcon={<SendIcon />} 
                    sx={{ backgroundColor:"darkred", maxWidth:96}}>
                    Search
                </SearchButton>
                {}
            </div>
            <div className = "game-header">
                <h1>Games</h1>
                <section className = "game-body"> 
                    <article className="game-body">
                        <div className="home-text-left">
                            <a href={`/games/${featureGame[0].id}`} className='home-header home-font-size-large'>
                                {clip_article(featureGame[0].title)}
                            </a>
                        </div>
                        <p className="home-text-left">
                            {/*main body*/ }
                            {clip_article(featureGame[0].description)} 
                        </p>
                    </article>
                    <article className="game-body">
                        <div className="home-text-left">
                            <a href={`/games/${featureGame[1].id}`} className='home-header home-font-size-large'>
                                {clip_article(featureGame[1].title)}
                            </a>
                        </div>
                        <p className="home-text-left">
                            {/*main body*/ }
                            {clip_article(featureGame[1].description)}
                        </p>
                    </article>
                    <article className="game-body">
                        <div className="home-text-left">
                            <a href={`/games/${featureGame[2].id}`} className='home-header home-font-size-large'>
                                {clip_article(featureGame[2].title)}
                            </a>
                        </div>
                        <p className="home-text-left">
                            {/*main body*/ }
                            {clip_article(featureGame[2].description)}
                        </p>
                    </article>
                    <article className="game-body">
                        <div className="home-text-left">
                            <a href={`/games/${featureGame[3].id}`} className='home-header home-font-size-large'>
                                {clip_article(featureGame[3].title)}
                            </a>
                        </div>
                        <p className="home-text-left">
                            {/*main body*/ }
                            {clip_article(featureGame[3].description)}
                        </p>
                    </article>
                    <article className="game-body">
                        <div className="home-text-left">
                            <a href={`/games/${featureGame[4].id}`} className='home-header home-font-size-large'>
                                {clip_article(featureGame[4].title)}
                            </a>
                        </div>
                        <p className="home-text-left">
                            {/*main body*/ }
                            {clip_article(featureGame[4].description)}
                        </p>
                    </article>
                </section>
            </div>
        </div>
        
    )
}  

export default GamesList;