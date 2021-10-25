import React         from 'react';
import { useState }  from 'react';
import { styled }    from '@mui/system';
import { useParams } from "react-router-dom";
import Rating        from '@mui/material/Rating';
import Button        from '@mui/material/Button';
import Typography    from '@mui/material/Typography';
import TextField     from '@mui/material/TextField';

import SendIcon from '@mui/icons-material/Send';

import './Article.css'

// required to use this instead of traditional css to override hover color. Sorry.
const SendButton = styled(Button)(({ theme }) => ({
    backgroundColor: "darkred",
    '&:hover': {
      backgroundColor: "darkred",
    },
}));

// using url parameters
const Article_P = (props) => {
    const [commentData, setCommentData] = useState("");
    
    const article_data = props.a_data;
    const{ name } = useParams();
    const article = article_data.find(article_obj => article_obj.title === name);
    
    if(!article) { return <h1>Error: 404 </h1>    }
    
    // this is the actual Article document
    return (
        <div className = "column">
            <div className = "article-header">
            <Typography variant="h5" component = "div" className = "header">
                    {article.title}
                </Typography>
            </div>
            <div className = "article-body" sx = {{ justifySelf:"center"}}>
                <Typography variant="body1" component = "div" className = "header" sx= {{ py: .5, textAlign: "left"}}>
                    By: {article.username}
                </Typography>
                <Rating name="read-only" value={article.rating / 20} readOnly sx ={{ paddingBottom: .5}}/>
                <Typography variant="body2" component = "div" className = "header" sx ={{paddingBottom: 2}}>
                        {article.lorem}
                </Typography>
                <TextField 
                    onChange = {(event) => { setCommentData(event.target.value); }}
                    id="outlined-multiline-static"
                    label="Leave a comment"
                    Enter a
                    rows={4}
                    defaultValue=""
                />
                <div className = "row">
                    <SendButton variant="contained" 
                        /* onClick = {sendCommentData(...)} TODO during back-end */
                        startIcon={<SendIcon />} 
                        sx={{ backgroundColor:"darkred", maxWidth:96}}>
                        Send
                    </SendButton>
                    {/* Mockaroo doesn't have enough flexibility to allow for fake
                        comment generation as it requires a username to be associated
                        with a comment. This will have to wait to be fleshed out
                        during front-end development. :( -DC @ October 25th, 2021 */}
                </div>
            </div>
        </div> 
    );
}  

export default Article_P;