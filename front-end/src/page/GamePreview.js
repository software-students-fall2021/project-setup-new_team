import React from 'react'
import { Link } from 'react-router-dom'
import './Article.css'

const GamePreview = (props) => {
  return (
    <article className="game-body">
        <Link to={`/game/${props.details.title}`}>
        <h2>{props.details.title}</h2>
        </Link>
        
        {/*<img alt="welcome!" src={`http://localhost:3000/static/images/${props.details.thumb}`} />*/}
        <h1>{props.details.description}</h1>
    </article>
  )
}

// make this function available to be imported into another module
export default GamePreview
