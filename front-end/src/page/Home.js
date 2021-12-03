import axios from 'axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
import './Home.css'


const clip_title = (data) => {
    if (data.length > 30) {
        return data.substring(0, 30) + "..."
    }
    return data
}
const clip_article = (data) => {
    if (data.length > 440) {
        return data.substring(0, 440) + "..."
    }
    return data
}
const Home = (props) => {
  const [featuredData, setFeaturedData] = React.useState([]); //actual data for page
  const [gamesImages, setGamesImages] = React.useState([]); //thumbs for games

  //generic query for data from server
  function getQuery(args){
      return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/${args}`)
            .then(res => {resolve(res.data)})
            .catch(err => {console.log(err)})
        })
  }
  function getThumb(path){
    return `http://localhost:3000/static/images/${path}`
  }
  //gets all page data asynchronously
  useEffect(() => {
     console.log("getting page data")
     async function getPageData(){
        const topGames = await getQuery("static/top_games.json")

        const topArticles = await getQuery("static/top_articles.json");
        const featuredGameCtnr1 = await getQuery(`games/${topGames.id1}`);
        const featuredGame1 = featuredGameCtnr1.data;
        const featuredGameCtnr2 = await getQuery(`games/${topGames.id2}`);
        const featuredGame2 = featuredGameCtnr2.data;
        const featuredArticle1 = await getQuery(`articles/${topArticles.id1}`);
        const featuredArticle2 = await getQuery(`articles/${topArticles.id2}`);
        setFeaturedData([featuredGame1, featuredGame2, featuredArticle1.data, featuredArticle2.data])
        console.log(featuredGame1);
        setGamesImages([getThumb(featuredGame1.thumb), getThumb(featuredGame2.thumb)])
    }
     getPageData()
  }, [])
  
  //we need all data to be loaded
  //before we can display the page
  if(featuredData.length < 4 || gamesImages.length < 2){return <div>Loading...</div>}
  return (
    <div className="container">
        <div className="Home">
        <h1>#DVG</h1>
        {/*Wrapper for featured games*/}
        <section className="featuredGames">
            {/*header for first game-left justified*/}
            {/*first game*/}
            <div className="home-text-left">
                <a href={`/games/${featuredData[0].id}`} className='home-header home-font-size-large'>
                    {clip_title(featuredData[0].title)}
                </a>
            </div>
            
            {/*body for first game-image on left*/}
            <p className="home-text-left">
                {/*clickable image*/}
                <Link to={`/games/${featuredData[0].id}`}>
                    <img alt="welcome!" src={gamesImages[0]} className='home-img-left'/>
                </Link>
                {/*main body*/ }
                {clip_article(featuredData[0].description)}
                {/*link to game*/}
                {" "}
                <Link to={`/games/${featuredData[0].id}`}>View Game{" "} </Link> 
            </p>
            <br/>
            
            {/*header for second game-right justified*/}
            <div className = 'home-text-right'>
                <a href={`/games/${featuredData[1].id}`} className='home-header home-font-size-large'> 
                    {clip_title(featuredData[1].title)}
                </a>
            </div>
            
            {/*body for second game-image on right*/}
            <p className="home-text-left">
                {/*clickable image*/}
                <Link to={`/games/${featuredData[1].id}`}>
                    <img alt="welcome!" src={gamesImages[1]} className='home-img-right'/>
                </Link>
                {/*main body*/ }
                {clip_article(featuredData[1].description)}
                {/*link to game*/}
                {" "}
                <Link to={`/games/${featuredData[1].id}`}>View Game{" "} </Link> 
            </p>
                
                
            <br/>
            
            {/*centered link to more games*/}
            <div className = 'home-text-center'>
                <a href='/games' className = 'home-header home-font-size-medium'>
                    Browse all games
                </a>
            </div>
        </section>
        <br/>
        <br/>
        <br/>

        
        {/*wrapper for featured articles*/}
        <section className="featured-arcticles">
                {/*header for first article*/}
                <div className='home-text-center'> 
                    <Link to={`./articles/${featuredData[2].article_name}`} className = 'home-header home-font-size-large'>
                        {clip_title(featuredData[2].article_name)}
                    </Link>
                </div>
                {/*body for first article*/}
                <p>
                    {/*first article content*/}
                    {clip_article(featuredData[2].article_text)}
                    {/*first article link*/}
                    <Link to={`./articles/${featuredData[2].article_name}`}> {"<"}Read full article{">"}</Link>
                </p>

                {/*header for second article*/}
                <div className='home-text-center'> 
                    <Link to={`./articles/${featuredData[3].article_name}`} className = 'home-header home-font-size-large'>
                        {clip_title(featuredData[3].article_name)}
                    </Link>
                </div>

                {/*body for second article*/}
                <p>
                    {/*second article content*/}
                    {clip_article(featuredData[3].article_text)}
                                    
                    {/*second article link*/}
                    <Link to={`./articles/${featuredData[3].article_name}`}  > {"<"}Read full article{">"}</Link>
                </p>

                <div className='home-text-center'>
                    <a href='/articles' className = 'home-header home-font-size-medium'>
                        Browse Articles
                    </a>
                </div>
        </section>
        
        <br/>
        <br/>
        <br/>
        
        </div>
        
    </div>
  )
}

export default Home