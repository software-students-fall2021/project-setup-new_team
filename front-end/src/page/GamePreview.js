import React from 'react'
import { Link } from 'react-router-dom'
import './Article.css'

const GamePreview = (props) => {
  return (
    <article className="game-body">
        <Link to={`/game/${props.details.title}`}>
        <h2>{props.details.title}</h2>
        </Link>
        <h1>{props.details.description}</h1>
    </article>
  )
}

// make this function available to be imported into another module
export default GamePreview
