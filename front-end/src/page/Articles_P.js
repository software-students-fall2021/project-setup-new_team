import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Typography from '@mui/material/Typography';
import ArticlesList from '../comp/ArticlesList';

import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';

import './Article.css'

const UploadButton = styled(Button)(({ theme }) => ({
    backgroundColor: "darkred",
    '&:hover': {
      backgroundColor: "darkred",
    },
}));

const fs = require('fs');

const Articles_P = (props) => 
{
	const [file, setFile] = useState();
	const [isFileReal, setFileIsReal] = useState(false);

	useEffect(() => {
		// "fetch" from mockaroo
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
			<>
				<input type="file" name="file" onChange = {(event) =>
				{
				{/* https://www.pluralsight.com/guides/uploading-files-with-reactjs */}
					setFile(event.target.files[0]);
					setFileIsReal(true);
				}}/>
				<UploadButton variant="contained" 
	                onClick = {(event) => 
                	{ 
                		// this functionality seems to be a bit more complicated than
                		// i had imagined. I'll need to review a bit more on how to convert
                		// a basic file object into a JSON-esque object to then. Maybe
                		// i'll just send it as is and convert it to JSON on the server...?
                		let fileReader = new FileReader();
                		fileReader.onload = function(event) {
                			let result = JSON.parse(event.target.result);



	                		axios.post(`http://localhost:3000/articles/upload`, result).then(response => {

	                		}).catch(response => {
	                			console.log("file upload failed! very fucking bad!");
	                		})
                		}

                		fileReader.readAsText(file);

                    }}
	            	startIcon={<SendIcon />} 
	            	sx={{ backgroundColor:"darkred", maxWidth:96}}> 
	            	Upload 
	            </UploadButton>
			</>
			</div>
		<div className = "article-body">
			<ArticlesList a_data = {props.a_data} />
		</ div>
		</div>
	);
}

// <ArticleCard a_user = "Dancuz4189" a_name = "How To Create a 2D Platformer" a_tags = {["Mechanics", "Physics" , "Mathematics","\0"]} a_desc = "hello" />
export default Articles_P;
