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
  const [featured_data, setFeaturedData] = React.useState([]);
  const [top_articles, set_top_articles] = React.useState([]);
  const [top_games, set_top_games] = React.useState([]);
  useEffect(() =>{
    if(featured_data.length === 4){return;}
    if(Object.keys(top_articles).length === 0){
        axios.get('http://localhost:3000/top_articles')
            .then(res => { set_top_articles(res.data) }) 
            .catch(err => { console.log(err) })
    }
    
    if(Object.keys(top_games).length === 0){
        axios.get('http://localhost:3000/top_games')
            .then(res => { set_top_games(res.data) }) 
            .catch(err => { console.log(err) })
    }
    
    if(Object.keys(top_games).length !== 2 || Object.keys(top_articles).length !== 2){
        console.log(`loading...${Object.keys(top_games).length} ${Object.keys(top_articles).length}`)
        return;
    }
    console.log(`...getting featured pages ${featured_data.length}`)
    var id;
    if(featured_data.length === 0){id = top_games.id1;}
    else if(featured_data.length === 1){id = top_games.id2;}
    else if(featured_data.length === 2){id = top_articles.id1;}
    else if(featured_data.length === 3){id = top_articles.id2;}
    axios.get(`http://localhost:3000/games_data/${id}`)
        .then(res => { setFeaturedData([...featured_data, res.data]) })
        .catch(err => { console.log(err) })
  }, [top_articles.id1, top_articles.id2, top_games.id1, top_games.id2, featured_data])
  
  if(featured_data.length < 4){
      //because we have a constant number of games/articles, 
      //we need all the data loaded to display the home page
      return <div>Loading...</div>
  }
  return (
    <div className="container">
        <div className="Home">
        <h1>#DVG</h1>
        {/*Wrapper for featured games*/}
        <section className="featuredGames">
            {/*header for first game-left justified*/}
            {/*first game*/}
            <div className="home-text-left">
                <a href={`/game/${featured_data[0].title}`} className='home-header home-font-size-large'>
                    {clip_title(featured_data[0].title)}
                </a>
            </div>
            
            {/*body for first game-image on left*/}
            <p className="home-text-left">
                {/*clickable image*/}
                <Link to={`/game/${featured_data[0].title}`}>
                    <img alt="welcome!" src="https://picsum.photos/105?page=home" className='home-img-left'/>
                </Link>
                {/*main body*/ }
                {clip_article(featured_data[0].lorem)}
                {/*link to game*/}
                <Link to={`/game/${featured_data[0].title}`}>{"<"}View Game{">"} </Link> 
            </p>
            <br/>
            
            {/*header for second game-right justified*/}
            <div className = 'home-text-right'>
                <a href={`/game/${featured_data[0].title}`} className='home-header home-font-size-large'> 
                    {clip_title(featured_data[1].title)}
                </a>
            </div>
            
            {/*body for second game-image on right*/}
            <p className="home-text-left">
                {/*clickable image*/}
                <Link to={`/game/${featured_data[1].title}`}>
                    <img alt="welcome!" src="https://picsum.photos/105?page=home" className='home-img-right'/>
                </Link>
                {/*main body*/ }
                {clip_article(featured_data[1].lorem)}
                {/*link to game*/}
                <Link to={`/game/${featured_data[1].title}`}>{"<"}View Game{">"} </Link> 
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
                    <Link to={`./articles/${featured_data[2].title}`} className = 'home-header home-font-size-large'>
                        {clip_title(featured_data[2].title)}
                    </Link>
                </div>
                {/*body for first article*/}
                <p>
                    {/*first article content*/}
                    {clip_article(featured_data[2].lorem)}
                    {/*first article link*/}
                    <Link to={`./articles/${featured_data[2].title}`}> {"<"}Read full article{">"}</Link>
                </p>

                {/*header for second article*/}
                <div className='home-text-center'> 
                    <Link to={`./articles/${featured_data[3].title}`} className = 'home-header home-font-size-large'>
                        {clip_title(featured_data[3].title)}
                    </Link>
                </div>

                {/*body for second article*/}
                <p>
                    {/*second article content*/}
                    {clip_article(featured_data[3].lorem)}
                                    
                    {/*second article link*/}
                    <Link to={`./articles/${featured_data[3].title}`}  > {"<"}Read full article{">"}</Link>
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