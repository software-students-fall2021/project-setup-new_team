import React, { useState, useEffect } from 'react';
import axios from 'axios'


import './Article.css'
import './GamePage.css'
import { Link, useParams } from 'react-router-dom'

const GamesPage = (props) => 
{
	const [data, setData] = useState([])
	const [username, setUsername] = useState('')
	const id = useParams().id;
  	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/games/${id}`)
		.then((response) => {
			setData(response.data.data)
		})
		.catch((err) => {
			console.error(err)
		})
  	}, [id])
	useEffect(() => {
		if(data.length === 0){
			return;
		}
		axios.get(`${process.env.REACT_APP_BACKEND_URL}/username/${data.userid}`)
		.then((response) => {
			setUsername(response.data.username)
			console.log(response.data.username)
		})
		.catch((err) => {
			console.error(err)
		})
	}, [data])
	if(data.length === 0)
	{
		return <div>Loading...</div>
	}
	return (
		<div>
			<h1>{data.title}</h1>
			<section className="game-header">
				<article key={data.id}>
				<img src={`${process.env.REACT_APP_BACKEND_URL}/static/images/${data.thumb}`} alt="alt text" className="game-img-center"/>
				<div className= "game-description">
					<p>{data.description}</p>
					<button className = "button-search">Play</button>
				</div>
				</article>
			</section>
			{username && <h3>A game by {' '}
			<Link to={`/user/${data.userid}`}>
				 {username}
			</Link> </h3>}
			<Link to={`/comments`}>
			<h2>Comments</h2>
			</Link>
		</div>
	);
}

// <ArticleCard a_user = "Dancuz4189" a_name = "How To Create a 2D Platformer" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} a_desc = "hello" />
export default GamesPage;
