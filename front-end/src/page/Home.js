import React from 'react'
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
    
  const b_data = props.b_data;
  if(b_data.length < 4){
      //because we have a constant number of games/articles, 
      //we need all the data loaded to display the home page
      return <div>Loading...</div>;
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
                <a href={`/game/${b_data[0].title}`} className='home-header home-font-size-large'>
                    {clip_title(b_data[0].title)}
                </a>
            </div>
            
            {/*body for first game-image on left*/}
            <p className="home-text-left">
                {/*clickable image*/}
                <Link to={`/game/${b_data[0].title}`}>
                    <img alt="welcome!" src="https://picsum.photos/105?page=home" className='home-img-left'/>
                </Link>
                {/*main body*/ }
                {clip_article(b_data[0].lorem)}
                {/*link to game*/}
                <Link to={`/game/${b_data[0].title}`}>{"<"}View Game{">"} </Link> 
            </p>
            <br/>
            
            {/*header for second game-right justified*/}
            <div className = 'home-text-right'>
                <a href={`/game/${b_data[0].title}`} className='home-header home-font-size-large'> 
                    {clip_title(b_data[1].title)}
                </a>
            </div>
            
            {/*body for second game-image on right*/}
            <p className="home-text-left">
                {/*clickable image*/}
                <Link to={`/game/${b_data[1].title}`}>
                    <img alt="welcome!" src="https://picsum.photos/105?page=home" className='home-img-right'/>
                </Link>
                {/*main body*/ }
                {clip_article(b_data[1].lorem)}
                {/*link to game*/}
                <Link to={`/game/${b_data[1].title}`}>{"<"}View Game{">"} </Link> 
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
                    <Link to={`./articles/${b_data[2].title}`} className = 'home-header home-font-size-large'>
                        {clip_title(b_data[2].title)}
                    </Link>
                </div>
                {/*body for first article*/}
                <p>
                    {/*first article content*/}
                    {clip_article(b_data[2].lorem)}
                    {/*first article link*/}
                    <Link to={`./articles/${b_data[2].title}`}> {"<"}Read full article{">"}</Link>
                </p>

                {/*header for second article*/}
                <div className='home-text-center'> 
                    <Link to={`./articles/${b_data[3].title}`} className = 'home-header home-font-size-large'>
                        {clip_title(b_data[3].title)}
                    </Link>
                </div>

                {/*body for second article*/}
                <p>
                    {/*second article content*/}
                    {clip_article(b_data[3].lorem)}
                                    
                    {/*second article link*/}
                    <Link to={`./articles/${b_data[3].title}`}  > {"<"}Read full article{">"}</Link>
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