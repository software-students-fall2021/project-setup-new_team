import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Typography from '@mui/material/Typography';
import ArticlesList from '../comp/ArticlesList';

import './Article.css'

const Articles_P = () => 
{

	// just like the professor showed us: use [] to execute only once
	const [data, setData] = useState([])
	
	// pull from mockaroo
	useEffect(() => {

		// "fetch" from mockaroo
		console.log('fetching random article data!')
		axios('https://my.api.mockaroo.com/articles.json?key=89ff35f0')
			.then((response) => {
				setData(response.data)
		})
		.catch((err) => 
		{
			// error! bad bad bad!	
			console.log(`uh oh! Can't request anymore data man :(`)
			console.error(err)

			// just like professor, make back up data to send to
			// front-end

			const backupData = 
			[
				{
					"username": "emcelane0",
					"title"	  : "Welcome to Sarajevo",
					"job"	  : "Desktop Support Technician",
					"rating"  : 72,
					"lorem"	  : "mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit"
				}
			]

			setData(backupData)
		})
	}, [])

	return (
	<div className = "article-body">
		<Typography variant = "h4" component = "div" className = "article-header"> 
			User Created Articles
		</Typography>
		<ArticlesList data = {data} />
	</ div>
	);
}

// <ArticleCard a_user = "Dancuz4189" a_name = "How To Create a 2D Platformer" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} a_desc = "hello" />
export default Articles_P;
