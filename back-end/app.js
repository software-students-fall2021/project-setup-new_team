const express = require('express')
const app = express()
const path = require('path')

const multer = require('multer')
const axios = require('axios')
require('dotenv').config({silent: true})
const morgan = require('morgan')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static('public')) // only need this when we add static files: dead code for now


app.get('/articles_data/:id', (req,res,next) => {
    axios.get(`https://my.api.mockaroo.com/articles.json?key=02fe4bc0&type=article&id=${req.params.id}`) //random mock data
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

app.get('/games_data/:id', (req,res,next) => {
    axios.get(`https://my.api.mockaroo.com/articles.json?key=02fe4bc0&type=game&id=${req.params.id}`) //random mock data
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

app.get('/images/:id', (req,res,next)  => {
    axios.get(`https://picsum.photos/id/${req.params.id}/info`) //will return JSON for _specific photo_ from picsum
    .then(response => res.json(response.data))
    .catch(err => next(err))
})

module.exports = app