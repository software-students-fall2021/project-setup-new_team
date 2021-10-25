import React from 'react';
import {
    BrowserRouter as Router,
    useParams
} from "react-router-dom";
import Typography from '@mui/material/Typography';

// using url parameters
const Article_P = (props) => {

    const article_data = props.a_data;
    const{ name } = useParams();
    const article = article_data.find(article_obj => article_obj.title === name);
    console.log(name)

    if(!article)
    {
        return <h1>Error: 404 </h1>    
    }
    
    // this is the actual Article document
    return ( 
        <>
            <Typography variant="h5" component = "div" className = "header">
                {article.title}
            </Typography>
        </>
    );
}  

export default Article_P;