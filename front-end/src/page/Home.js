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
  function getQuery(args){
      return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/${args}`)
            .then(res => {resolve(res.data)})
            .catch(err => {console.log(err)})
        })
  }
  async function getPageData(){
        const topGames = await getQuery("top_games")
        const topArticles = await getQuery("top_articles");
        const featuredGame1 = await getQuery(`games_data/${topGames.id1}`);
        const featuredGame2 = await getQuery(`games_data/${topGames.id2}`);
        const featuredArticle1 = await getQuery(`articles_data/${topArticles.id1}`);
        const featuredArticle2 = await getQuery(`articles_data/${topArticles.id2}`);
        setFeaturedData([featuredGame1, featuredGame2, featuredArticle1, featuredArticle2])
  }
  useEffect(() => {
     console.log("getting page data")
     getPageData()
  }, [])
  
  if(featuredData.length < 4){return <div>Loading...</div>}
  return (
    <div className="container">
        <div className="Home">
        <h1>#DVG</h1>
        {/*Wrapper for featured games*/}
        <section className="featuredGames">
            {/*header for first game-left justified*/}
            {/*first game*/}
            <div className="home-text-left">
                <a href={`/game/${featuredData[0].title}`} className='home-header home-font-size-large'>
                    {clip_title(featuredData[0].title)}
                </a>
            </div>
            
            {/*body for first game-image on left*/}
            <p className="home-text-left">
                {/*clickable image*/}
                <Link to={`/game/${featuredData[0].title}`}>
                    <img alt="welcome!" src="https://picsum.photos/105?page=home" className='home-img-left'/>
                </Link>
                {/*main body*/ }
                {clip_article(featuredData[0].lorem)}
                {/*link to game*/}
                <Link to={`/game/${featuredData[0].title}`}>{"<"}View Game{">"} </Link> 
            </p>
            <br/>
            
            {/*header for second game-right justified*/}
            <div className = 'home-text-right'>
                <a href={`/game/${featuredData[0].title}`} className='home-header home-font-size-large'> 
                    {clip_title(featuredData[1].title)}
                </a>
            </div>
            
            {/*body for second game-image on right*/}
            <p className="home-text-left">
                {/*clickable image*/}
                <Link to={`/game/${featuredData[1].title}`}>
                    <img alt="welcome!" src="https://picsum.photos/105?page=home" className='home-img-right'/>
                </Link>
                {/*main body*/ }
                {clip_article(featuredData[1].lorem)}
                {/*link to game*/}
                <Link to={`/game/${featuredData[1].title}`}>{"<"}View Game{">"} </Link> 
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
                    <Link to={`./articles/${featuredData[2].title}`} className = 'home-header home-font-size-large'>
                        {clip_title(featuredData[2].title)}
                    </Link>
                </div>
                {/*body for first article*/}
                <p>
                    {/*first article content*/}
                    {clip_article(featuredData[2].lorem)}
                    {/*first article link*/}
                    <Link to={`./articles/${featuredData[2].title}`}> {"<"}Read full article{">"}</Link>
                </p>

                {/*header for second article*/}
                <div className='home-text-center'> 
                    <Link to={`./articles/${featuredData[3].title}`} className = 'home-header home-font-size-large'>
                        {clip_title(featuredData[3].title)}
                    </Link>
                </div>

                {/*body for second article*/}
                <p>
                    {/*second article content*/}
                    {clip_article(featuredData[3].lorem)}
                                    
                    {/*second article link*/}
                    <Link to={`./articles/${featuredData[3].title}`}  > {"<"}Read full article{">"}</Link>
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