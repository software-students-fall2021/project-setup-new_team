import React,{ useState, useEffect } from 'react';
import { styled }    from '@mui/system';
import Button        from '@mui/material/Button';
import TextField     from '@mui/material/TextField';
import axios from 'axios'

import SendIcon from '@mui/icons-material/Send';
//import GamePreview from './GamePreview';


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

    const [searchMessage, setSearchMessage] = useState("");
    function getQuery(args){
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/${args}`)
            .then(res => (resolve(res.data)))
            .catch(err => console.log(err))
        })
    }
    function sendSearchQuery(){
        axios.post('http://localhost:3000/games_search', {
            id: searchData
        })
        .then(res => {
            setSearchMessage("Results:")
            setFeatureGame([res.data.data])
        }).catch(
            err => {
                if(err.response.status === 404){
                    setSearchMessage("Game not found")
                }else{
                    setSearchMessage("Server error :(")
                }
            }
        )
    }
    

    
    useEffect(() => {
        console.log("Games page")
        setFeatureGame([])
        async function getGameList() {
            const topGames = await getQuery("static/featured_games.json")
            //add each topGame to list
            topGames.ids.forEach(id => {
                getQuery(`games/${id}`).then(res => {
                setFeatureGame(featureGame => [...featureGame, res.data])
                })
            })
            console.log(featureGame[0])
        }   
        getGameList()
    }, [])
    
    
    /*if(featureGame.length < 5) {return <div>Loading...</div>}*/
    return (    
        <div className = "column">
            <div className = "text-box">
            <TextField 
                    onChange = {(event) => { setSearchData(event.target.value); }}
                    id="outlined-multiline-static"
                    label="Search"
                    rows={4}
                    defaultValue=""
                />
            </div>
            <div className = "search">
                <SearchButton variant="contained" 
                    onClick = {() => { sendSearchQuery(); }}
                    startIcon={<SendIcon />} 
                    sx={{ backgroundColor:"darkred", maxWidth:96}}>
                    Search
                </SearchButton>
                {}
            </div>
            {searchMessage}
            <div className = "game-header">
                <h1>Games</h1>
                <section className = "game-body"> 
                    {featureGame.map((game, index) => {
                        return (  
                        <article className="game-body">
                            <div className="home-text-left">
                                <a href={`/games/${featureGame[index].id}`} className='home-header home-font-size-large'>
                                    {clip_article(featureGame[index].title)}
                                </a>
                            </div>
                            
                            <img src={`http://localhost:3000/static/images/${featureGame[index].thumb}`} className="home-img-left" />
                            
                            
                            <p className="home-text-left">
                                {/*main body*/ }
                                {clip_article(featureGame[index].description)} 
                            </p>
                        </article>
                        )}
                    )}
                    
                </section>
            </div>
        </div>
        
    )
}  

export default GamesList;