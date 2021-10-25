import React         from 'react';
import Rating        from '@mui/material/Rating';
import { useParams } from "react-router-dom";
import Typography    from '@mui/material/Typography';

import './Article.css'

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
        <div className = "column">
            <div className = "article-header">
            <Typography variant="h4" component = "div" className = "header">
                    {article.title}
                </Typography>
            </div>
            <div className = "article-body">
                <Typography variant="body1" component = "div" className = "header" sx= {{ py: .5, textAlign: "left"}}>
                    By: {article.username}
                </Typography>
                <Rating name="read-only" value={article.rating / 20} readOnly sx ={{ paddingBottom: .5}}/>
                <Typography variant="body2" component = "div" className = "header">
                    {article.lorem}
                </Typography>
            </div>
        </div> 
    );
}  

export default Article_P;