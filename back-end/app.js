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

app.use('/static', express.static('public'))


app.get('/articles/:name', (req,res,next) => {
    axios.get(`https://my.api.mockaroo.com/articles.json?key=02fe4bc0&id=${req.params.name}`)
    .then(response => res.json(response.data))
    .catch(err => next(err))
})


module.exports = app