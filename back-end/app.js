const express = require('express')
const app = express()
const path = require('path')

const multer = require('multer')
const axios = require('axios')
require('dotenv').config({silent: true})
const morgan = require('morgan')
const cors = require('cors')

// json database for articles -DC
const articleData = 
[
    {
        article_name:"learning",
        article_text:"text",
        image_url   :"https://i.kym-cdn.com/entries/icons/original/000/011/900/dopefish_lives_kakkit.gif", // the dopefish lives!
        poster_name :"username",
        rating      :0,
        comments    :
        [
            {
                "poster_name":"username",
                "comment_text":"this article rocks!",
            }
        ],
    },
    {
        article_name:"learning2",
        article_text:"text2",
        image_url   :"https://i.kym-cdn.com/entries/icons/original/000/011/900/dopefish_lives_kakkit.gif", // the dopefish lives!
        poster_name :"username2",
        rating      :0,
        comments    :
        [
            {
                "poster_name":"username2",
                "comment_text":"this article rocks! 2",
            }
        ],
    }
]

app.use(morgan('dev'))
app.use(cors()) //enables CORS for _all_ requests 

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static('public')) // only need this when we add static files: dead code for now

app.get('/articles_data/:id', (req,res,next) => {
    if(process.env.DEBUG){
        res.json({
            type: 'article',
            id: req.params.id,
            title: 'Debugging Title',
            user: 'johnsmith1',
            rating: 5.78,
            lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        })
    }else{
        //use global mockaroo key and return mock data
        axios.get(`https://my.api.mockaroo.com/page_data.json?key=${process.env.API_KEY}&type=article&id=${req.params.id}`) //random mock data
        .then(response => res.json(response.data))
        .catch(err => next(err))
    }
    
})

app.get('/articles', (req, res, next) => {
    if(process.env.DEBUG)
    {
        res.json(articleData.map((article) => 
        ({ 
            article_name  : article.article_name,
            article_text  : article.article_text.substring(0, 100),
            article_poster: article.poster_name,
        }))
    }
})

app.get('/articles/:name', (req, res, next) => {
    if(process.env.DEBUG) 
    {
        const name       = req.params.name;
        const articleObj = articleData.find(article => article.article_name === name);
        if(!articleObj) // null
        {
            res.json({
                success: false,
                error: "Error 404: article does not exist!"
            })
        }
        else 
        {
            res.json({
                success: true,
                data: articleObj
            })
        }
    } 
    else
    {
        // we technically don't want to generate data on the fly here. We want the server
        // to have its data at startup-time + real-time changes as the users append more content
        // to the articles database. For now, this database will simply be a json object containing
        // all articles. -DC @ 4:14 PM November 7th, 2021.

        // the server will do the following when a client requests a specific article:
        // (1) check if the article exists. if it does, send it in a json object to the end-user.
        // (2) if the articles doesn't exist, send a message saying Error 404.

        const name    = req.params.name;
        const article = articleData.find(article => article.name === name);
    }
})

app.get('/games_data/:id', (req,res,next) => {
    if(process.env.DEBUG){
        res.json({
            type: 'game',
            id: req.params.id,
            title: 'Debugging Title',
            user: 'johnsmith1',
            rating: 5.78,
            lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        })
    }else{
        //use global mockaroo key and return mock data
        axios.get(`https://my.api.mockaroo.com/page_data.json?key=${process.env.API_KEY}1ed32ac0&type=game&id=${req.params.id}`) //random mock data
        .then(response => res.json(response.data))
        .catch(err => next(err))
    }
})

app.get('/images/:id', (req,res,next)  => {
    //picsum has no data limit so we don't need debug mode
    axios.get(`https://picsum.photos/id/${req.params.id}/info`) //will return JSON for _specific photo_ from picsum
    .then(response => res.json(response.data))
    .catch(err => next(err))
})


//return indices of featured articles for home page
app.get('/top_articles', (req,res,next) => {
    if(process.env.DEBUG){
        res.json({id1: 1, id2: 2})
    }else{
        //use global mockaroo key and return mock data
        axios.get(`https://my.api.mockaroo.com/top.json?key=${process.env.API_KEY}`) //indices of top articles
        .then(response => res.json(response.data))
        .catch(err => next(err))
    }
    
})

//return indices of featured games for home page
app.get('/top_games', (req,res,next) => {
    if(process.env.DEBUG){
        res.json({id1: 1, id2: 2})
    }else{
        axios.get(`https://my.api.mockaroo.com/top.json?key=${process.env.API_KEY}`) //indices of top games
        .then(response => res.json(response.data))
        .catch(err => next(err))
    }
    
})

//get information for registration
app.post('/register', (req,res,next) => {
    console.log(req.body)
    //missing username
    if(!req.body.username){
        res.status(400).json({error: 'Username is required'})
    }
    //missing email
    if(!req.body.email){
        res.status(400).json({error: 'Email is required'})
    }
    //missing password
    if(!req.body.password){
        res.status(400).json({error: 'Password is required'})
    }
    //missing password confirmation
    if(!req.body.confirm_password){
        res.status(400).json({error: '{Password confirmation is required'})
    }
    //passwords do not match
    if(req.body.password != req.body.confirm_password){
        res.status(400).json({error: 'Passwords do not match'})
    }
    if(req.body.password.length < 6){
        res.status(400).json({error: 'Password must be at least 6 characters'})
    }
    //link to database goes here

    res.json({
        status: 'Success!'
    })
})

app.post('/login', (req,res,next) => {
    console.log(req.body)
    //missing username
    if(!req.body.username){
        res.status(400).json({error: 'Username is required'})
    }
    //missing password
    if(!req.body.password){
        res.status(400).json({error: 'Password is required'})
    }
                //we'll check password against database instead of comparing a string
    if(req.body.password == 'password'){
        res.json({
            status: 'Success!'
        })
    }else{
        res.status(400).json({error: 'Password submitted does not match our records'})
    }
})

app.get('/games', (req,res,next) => {
    if(process.env.DEBUG){
        res.json({id1: 1, id2: 2})
    }else{
        axios.get(`https://my.api.mockaroo.com/game_test_two.json?key=77851f20`) //list of games
        .then(response => res.json(response.data))
        .catch(err => next(err))
    }
})

app.get("/games/:id", (req, res, next) => {
    if(process.env.DEBUG){
        res.json({
            id: req.params.id,
            title: 'CSGO',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        })
    }else{
        //use global mockaroo key and return mock data
        axios.get(`https://my.api.mockaroo.com/game.json?key=77851f20&id=${req.params.id}`) //random mock data
        .then(response => res.json(response.data))
        .catch(err => next(err))
    }
})

app.get('/query', (req, res, next) => {
    const search = req.query
    res.json = search
})

app.get('/params/:tile', (req, res, next) => {
    const params = req.params
    res.json({
        params:params
    })
})

module.exports = app