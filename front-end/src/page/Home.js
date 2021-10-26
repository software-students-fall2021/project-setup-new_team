import React from 'react'
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
import './Home.css'



const Home = (props) => {
  return (
    <div className="container">
        <div className="Home">
        <h1>#DVG</h1>
        
        {/*Wrapper for featured games*/}
        <section className="featuredGames">
            {/*header for first game-left justified*/}
            <div className="textLeft">
                <a href='/game' className='header fontSizeLarge'>
                    Featured game #1
                </a>
            </div>
            
            {/*body for first game-image on left*/}
            <p className="textLeft">
                {/*clickable image*/}
                <Link to="/games">
                    <img alt="welcome!" src="https://picsum.photos/105?page=home" className='imgLeft'/>
                </Link>
                {/*main body*/ }
                Lorem ipsum dolor sit amet, consectet- ur adipiscing elit! Vestibulum ac ullam corper sapien!
                Sed sit amet bibendum erat! Nunc lorem arcu, laoreet a auctor in, bibendum ut magna! Donec
                mattis dui quis ante bibendum congue! Curabitur sit amet scelerisque lacus, eget ultrices
                nisi! Vivamus interdum non mi pretium mattis! Integer convallis, mauris at iaculis pulvinar,
                enim orci fringilla elit, vitae eleifend est tortor quis enim sina lita dorum onnus...    
                {/*link to game*/}
                <Link to="/games">{"<"}View Game{">"} </Link> 
            </p>
            <br />
            {/*header for second game-right justified*/}
            <div className = 'textRight'>
                <a href='/games' className='header fontSizeLarge'> Featured game #2  </a>
            </div>
            
            {/*body for second game-image on right*/}
            <p className="textLeft">
                {/*clickable image*/}
                <Link to="/games">
                    <img alt="welcome!" src="https://picsum.photos/105?page=home" className='imgRight'/>
                </Link>
                {/*main body*/ }
                Lorem ipsum dolor sit amet, consectet- ur adipiscing elit! Vestibulum ac ullam corper sapien!
                Sed sit amet bibendum erat! Nunc lorem arcu, laoreet a auctor in, bibendum ut magna! Donec
                mattis dui quis ante bibendum congue! Curabitur sit amet scelerisque lacus, eget ultrices
                nisi! Vivamus interdum non mi pretium mattis! Integer convallis, mauris at iaculis pulvinar,
                enim orci fringilla elit, vitae eleifend est tortor quis enim sina lita dorum onnus...    
                {/*link to game*/}
                <Link to="/games">{"<"}View Game{">"} </Link> 
            </p>
                
                
            <br/>
            
            {/*centered link to more games*/}
            <div className = 'textCenter'>
                <a href='/games' className = 'header fontSizeMedium'>
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
                <div className='textCenter'> 
                    <a href='/articles' className = 'header fontSizeLarge'>
                        Featured Article #1
                    </a>
                </div>
                <p>
                    {/*first article content*/}
                    Text text text text. Text text. Text text text. Text text text. Text text text text text text text. Text text. Text text text text text. Text text text text text text text text text text text. Text text text. Text text. Text text. Text text text text text text. Text text text text text. Text text. Text text text text text text text. Text text. Text text text text text. Text text text text text. Text text. Text text text text text. Text text. Text text text text text text text. Text text text. Text text text text text text text text text. Text text. Text text text text text text text text text text. Text text. Text text text text text. Text text text. Text text text. Text text.
                
                    {/*first article link*/}
                    <Link to="/articles"> {"<"}Read full article{">"}</Link>
                </p>

                {/*header for second article*/}
                <div className='textCenter'> 
                    <a href='/articles' className = 'header fontSizeLarge'>
                        Featured Article #2
                    </a>
                </div>
                <p>
                    {/*second article content*/}
                    Text text text text. Text text. Text text text. Text text text. Text text text text text text text. Text text. Text text text text text. Text text text text text text text text text text text. Text text text. Text text. Text text. Text text text text text text. Text text text text text. Text text. Text text text text text text text. Text text. Text text text text text. Text text text text text. Text text. Text text text text text. Text text. Text text text text text text text. Text text text. Text text text text text text text text text. Text text. Text text text text text text text text text text. Text text. Text text text text text. Text text text. Text text text. Text text.
                
                    {/*second article link*/}
                    <Link to="/articles"> {"<"}Read full article{">"}</Link>
                </p>

                <div className='textCenter'>
                    <a href='/articles' className = 'header fontSizeMedium'>
                        Browse Articles
                    </a>
                </div>
        </section>
        
        <br/>
        <br/>
        <br/>
        <div className='textCenter'>
            <a href='legal'>
                Legal information.
            </a>
        </div>
        
        </div>
        
    </div>
  )
}

export default Home