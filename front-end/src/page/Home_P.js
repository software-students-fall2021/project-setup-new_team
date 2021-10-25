import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArticleCard from './../comp/ArticleCloud'

import './Article.css'

const Home_P = () => (
	<div className = "article-body">
		<Typography variant = "h4" component = "div" className = "article-header"> 
			User Created Articles
		</Typography>
		<Stack spacing={2}> 
			<ArticleCard a_user = "Dancuz4189" a_name = "How To Create a 2D Platformer" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} />
			<ArticleCard a_user = "Dancuz4189" a_name = "Gameplay Mechanics: Jumping" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} />
			<ArticleCard a_user = "Dancuz4189" a_name = "How To Model a Cube" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} />
			<ArticleCard a_user = "Dancuz4189" a_name = "Idea: Marching Tetrahedra" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} />
			<ArticleCard a_user = "Dancuz4189" a_name = "Trenchbroom: Mapping Tips" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} />
			<ArticleCard a_user = "Dancuz4189" a_name = "Question: Any Good 3D Engines?" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} />
		</Stack>
	</ div>
)

export default Home_P;
