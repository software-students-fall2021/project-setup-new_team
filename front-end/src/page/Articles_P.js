import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Typography from '@mui/material/Typography';
import ArticlesList from '../comp/ArticlesList';

import './Article.css'

const Articles_P = (props) => 
{

	useEffect(() => {

		// "fetch" from mockaroo
		//console.log('fetching random article data!')
		axios('http://localhost:3000/articles') // server is on port 3000, we are on port 3001. cant use .
			.then((response) => {
				props.setArticleData(response.data)
		})
		.catch((err) => 
		{
			// at this point it should never fail!
			console.error(err)
		})
	}, [])

	return (
		<div className = "column">
			<div className = "article-header">
			<Typography variant = "h6" component = "div" className = "article-header"> 
				User Created Articles
			</Typography>
			</div>
		<div className = "article-body">
			<ArticlesList a_data = {props.a_data} />
		</ div>
		</div>
	);
}

// <ArticleCard a_user = "Dancuz4189" a_name = "How To Create a 2D Platformer" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} a_desc = "hello" />
export default Articles_P;
