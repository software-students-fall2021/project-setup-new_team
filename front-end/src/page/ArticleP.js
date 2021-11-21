import axios         from 'axios';
import React, { useState, useEffect } from 'react'

import { styled }    from '@mui/system';
import { useParams } from "react-router-dom";
import Divider       from "@mui/material/Divider"
import Rating        from '@mui/material/Rating';
import Button        from '@mui/material/Button';
import Typography    from '@mui/material/Typography';
import TextField     from '@mui/material/TextField';

import SendIcon      from '@mui/icons-material/Send';
import CommentList   from '../comp/CommentList';

import './Article.css'

// required to use this instead of traditional css to override hover color. Sorry.
const SendButton = styled(Button)(({ theme }) => ({
    backgroundColor: "darkred",
    '&:hover': {
      backgroundColor: "darkred",
    },
}));

// note: backward arrow button is scraped as it looked
// generally clunky and out of place. Main nav will be
// the primary way to leave this page and head back into articles

// using url parameters
const ArticleP = (props) => {
    const jwtToken = localStorage.getItem("loginToken")
    console.log(jwtToken)
    const [article, setArticleData]     = useState(null);
    const [commentData, setCommentData] = useState("");
    const [userData, setUserData]       = useState("");
    const [ratingData, setRatingData]   = useState(0);
    
    const { name } = useParams(); //useParams();
    
    //const article = article_data.find(article_obj => article_obj.title === name);
    // replace above code with a GET request:
    // pull from back-end
    useEffect(() => {

        // "fetch" from mockaroo
        axios(`http://localhost:3000/articles/${name}`)
            .then((response) =>
                setArticleData(response.data.data))
        .catch((err) => 
        {
            // article doesn't exist! very bad.
            console.error(err)
        })
    }, [name])

    if(!article) { return <h1>Error: 404 </h1> }
    
    // this is the actual Article document
    return (
        <div className = "column">
            <div className = "article-header">
            <Typography variant="h5" component = "div" className = "header">
                    {article.article_name}
                </Typography>
            </div>
            <div className = "article-body" sx = {{ justifySelf:"center"}}>
                <Typography variant="body1" component = "div" className = "header" sx= {{ py: .5, textAlign: "left"}}>
                    By: {article.poster_name}
                </Typography>
                <Rating name="read-only" value={article.rating / 20} readOnly sx ={{ paddingBottom: .5}}/>    
                <img src= { article.image_url } alt="article" />
                <Divider sx ={{ my: 1 }}/>
                <Typography variant="body2" component = "div" className = "header" sx ={{paddingBottom: 2}}>
                        {article.article_text}
                </Typography>
                <TextField 
                    onChange = {(event) => { setCommentData(event.target.value); }}
                    id="outlined-multiline-static"
                    label="What will your username be?"
                    rows={2}
                    defaultValue=""
                />
                <TextField 
                    onChange = {(event) => { setUserData(event.target.value); }}
                    id="outlined-multiline-static"
                    label="Leave a comment"
                    rows={4}
                    defaultValue=""
                />
                <div className = "row">
                <Rating sx ={{ paddingBottom: .5}} onChange = {(event) => { setRatingData(event.target.value); }} />
                    <SendButton variant="contained" 
                        onClick = {(event) => { axios.post(`http://localhost:3000/articles/${article.article_name}/comment`, ({
                                user: userData,
                                comment: commentData,
                                rating: ratingData,
                            }))
                            .then(response => {
                                // want to rerender page, will figure out l8r
                                // console.log(`${ response.data.error }`);    
                                // if(response.data.success)
                                // {
                                //     article.comments.push(
                                //     ({
                                //         username: response.data.comObj.user,
                                //         comment: response.data.comObj.comment,
                                //         rating: response.data.comObj.rating
                                //     }));
                                // }

                            })
                            .catch(response => (
                                console.log("comment failed to post?")
                            ))


                        }}
                        startIcon={<SendIcon />} 
                        sx={{ backgroundColor:"darkred", maxWidth:96}}>
                        Send
                    </SendButton>
                    {/* Mockaroo doesn't have enough flexibility to allow for fake
                        comment generation as it requires a username to be associated
                        with a comment. This will have to wait to be fleshed out
                        during front-end development. :( -DC @ October 25th, 2021 */}
                </div>
                <div>
                    <CommentList comment_data = { article.comments } />
                </div>
            </div>
        </div> 
    );
}  

export default ArticleP;