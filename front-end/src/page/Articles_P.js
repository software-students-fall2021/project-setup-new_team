import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Typography from '@mui/material/Typography';
import ArticlesList from '../comp/ArticlesList';

import './Article.css'

const Articles_P = (props) => 
{
	const data = props.a_data;

	return (
		<div className = "column">
			<div className = "article-header">
			<Typography variant = "h4" component = "div" className = "article-header"> 
				User Created Articles
			</Typography>
			</div>
		<div className = "article-body">
			<ArticlesList a_data = {data} />
		</ div>
		</div>
	);
}

// <ArticleCard a_user = "Dancuz4189" a_name = "How To Create a 2D Platformer" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} a_desc = "hello" />
export default Articles_P;
