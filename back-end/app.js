const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs'); // needed for reading debug json data outside of mockaroo -DC @ 6:11 PM Nov. 7th, 2021
const stream = require('stream');
const multer = require('multer')
const axios = require('axios')
require('dotenv').config({silent: true})
const morgan = require('morgan')
const cors = require('cors')
const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String,
    id: Number
})


const Article = require('./article.model.js');
const Comment = require('./comment.model.js');

const gameScheme = mongoose.model('Game', {
    id: Number,
    title: String,
    description: String,
    userid: Number,
    thumb: String,
    path: [{ type: String }]
})


const uri = process.env.MONGODB_URI;
if(uri){mongoose.connect(uri)}
else{
    const startServer = async () => {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoose.connect(uri);
    }
    startServer();
    const generateUser = async (username, email, password, id) => {
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        new User({
            username: username,
            email: email,
            password: hashedPassword,
            id: id
        }).save()
    }
    generateUser('johnsmith1','mail@mail.com', 'password1', 1)
    generateUser('janedoe1','mail2@mail.com', 'password2', 2)
}



const _ = require('lodash')
const jwt = require('jsonwebtoken')
const passport = require('passport')

app.use(passport.initialize())
const {jwtOptions, jwtStrategy} = require('./jwt-config.js')
passport.use(jwtStrategy)


app.use(morgan('dev'))
app.use(cors()) //enables CORS for _all_ requests 

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/static', express.static('public')) // only need this when we add static files

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
    

// Article functionality goes here
// let staticArticleData = {};

// fetch data from mockaroo on initialization, use this as a dynamic database until
// mongo is available -DC @ 6:18 PM November 7th, 2021

// This is deprecated code, I am leaving it here until the next sprint as it may provide
// use until we've decided its good to go. -DC @ 4:05 AM Nov. 21st, 2021.
// ;(() => {
//     if(process.env.DEBUG)
//     {
//         console.log("simulating a fetch of some data from mockaroo")

//         // fuck async for now, since we're doing this
//         // on start time
//         const debug_mock = fs.readFileSync('./article_schema.json'); 
//         staticArticleData = JSON.parse(debug_mock).map(article => 
//         ({
//             // we need to do this in order to append comments to each article.
//             article_name: article.article_name,
//             article_text: article.article_text,
//             image_url   : article.image_url,
//             poster_name : article.poster_name,
//             rating      : article.rating,
//             comments    : []
//         }));

//         // article_data.map(article => console.log(article))
//     }
//     else
//     {
//         console.log("actually fetching data from mockaroo")
//         axios.get(`https://my.api.mockaroo.com/article_schema.json?key=${process.env.ARTICLE_API_KEY}`) // article mock data
//             .then(response => staticArticleData = (response.data).map(article => 
//             ({
//             // we need to do this in order to append comments to each article.
//                 article_name: article.article_name,
//                 article_text: article.article_text,
//                 image_url   : article.image_url,
//                 poster_name : article.poster_name,
//                 rating      : article.rating,
//                 comments    : []           
//             })))
//             .catch(err => console.log(err.stack))
//     }
// }) // ()

app.get('/articles/debug/:name', async (req, res, next) => {
    const name = req.params.name;

    const doc = await Article.findOne({ article_name: name });

    if(doc != null)
    {
        res.json({
            success: true,
            data: doc
        });
    }
    else
    {
        res.json({
            success: false,
        })
    }
});

// when a user requests to upload an article
app.post('/articles/upload', async (req, res, next) => {

    const name = req.body.article_name;

    // replace this with a find operation via mongoose & mongoDB.
    // -DC @ 4:06 AM Nov. 21st, 2021
    // const articleObj = staticArticleData.find(article => article.article_name == article_name);
    const articleobj = await Article.findOne({ article_name : name });

    if(articleobj == null)
    {
        const text   = req.body.article_text;
        const author = req.body.poster_name;
        const imgurl = req.body.image_url;
        const rating = req.body.rating;

        if(!text || !author || !imgurl || !rating)
        {
            console.log(`${text} ${author} ${imgurl} ${rating}`);

            res.json({
                success: false,
                error: "article failed to upload."
            })
        }
        else
        {
            console.log("successful upload here");

            // instead of push, we'll want to append to the articles collection in mongodb
            // -DC @ 4:07 AM Nov. 21st, 2021.
            // staticArticleData.push(({
            //     // we need to do this in order to append comments to each article.
            //     article_name: article_name,
            //     article_text: text,
            //     image_url   : imgurl,
            //     poster_name : author,
            //     rating      : rating,
            //     comments    : []
            // }));

            const new_article = new Article({
                article_name      : name,
                poster_name       : author,
                article_text      : text,
                rating            : rating,
                image_url         : imgurl,
                comments          : []
            });

            // notify mongoose to save changes
            new_article.save( (err,res) => {
                if(err)
                    console.log(err);
                else
                    console.log(res);
            });

            res.json({
                success: true
            });
        }
    }
    else 
    {
        res.json({
            success: false
        });
    }
})

// when a user requests to post a comment
app.post('/articles/:name/comment', async (req, res, next) => {
    // with help with express's jsonParser this is very easy :)!
    // I'm going to keep this functionality just like 4chan and other
    // traditional forum spaces that allow for anonymous posting. Post 
    // anything you want and say you are whoever you want to be!

    // EDIT: I think its best we keep the anonymous nature of comments in constrast
    // with the requirement to have an account in order to post an article -DC

    const name = req.params.name;

    // replace with a mongodb find
    //let articleObj = staticArticleData.find(article => article.article_name == name);
    let articleObj = await Article.findOne({article_name: name});

    if(!articleObj)
    {
        res.json({success: false, error: "how did you even get here!? bad coder detected."});
        return;
    }

    const _comment     = req.body.comment; 
    const _username    = req.body.user;
    const _rating      = req.body.rating;

    if(!_username || !_comment || !_rating)
        res.json({success: false, error: `missing something: ${_username} ${_comment} ${_rating} !`})
    else
    {
        // some sanity checks here if you want to prevent toxicity:

        // append to the article document associated with the title.
        const comment = ({
            comment  : _comment,
            username : _username,
            rating   : _rating
        });

        articleObj.comments.push(comment);

        // notify mongoose to save changes
        articleObj.save( (err,res) => {
            if(err)
                console.log(err);
            else
                console.log(res);
        });

        // send our comment data back to append to front-end's local copy of 
        // comment
        res.json({success:true, comment });
    }
})


// get the trimmed article data from the express server to preview all articles -DC @ 6:53 PM Nov. 7th, 2021
app.get('/articles', async (req, res, next) => {      
    
    // maybe limit this amount at some later point. For now since articles
    // aren't going to be posted en masse its good to just go for this
    const all_docs = await Article.find({});

    res.json(all_docs.map((article) => ({
        article_name  : article.article_name,
        article_text  : article.article_text.substring(0, 100),
        article_poster: article.poster_name,
    })));

    // res.json(staticArticleData.map((article) => 
    // ({ 
    //     article_name  : article.article_name,
    //     article_text  : article.article_text.substring(0, 100),
    //     article_poster: article.poster_name,
    // })))
})

// get the article data from the express server -DC @ 6:53 PM Nov. 7th, 2021
app.get('/articles/:name', async (req, res, next) => {

    if(!req.params.name) {
        res.status(400).json({error: 'Text name is required!'}).end();
        return;
    }

    const name = req.params.name;
    
    //const articleObj = staticArticleData.find(article => article.article_name === name);
    articleObj = await Article.findOne({ article_name: name });

    if(!articleObj) // null
    {
        // im hesitant to change this error return as it may be vital to front-end display.
        // -DC @ 4:47PM Nov. 21st, 2021

        res.json({
            success: false,
            error: "Error 404: article does not exist!"
        })

        return;
    }
    else 
    {
        res.json({
            success: true,
            data: articleObj
        })
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

app.get('/images/:path', (req,res,next)  => {
    //picsum has no data limit so we don't need debug mode
    const r = fs.createReadStream(`./Games/${req.params.path}`)
    const ps = new stream.PassThrough();
    stream.pipeline(
        r,
        ps,
        (err) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'Error reading file'})
        }
    })
    ps.pipe(res)
})


app.get('/logintest', 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    res.json({
       status: 'congrats you are logged in!'
    })
  }
)
app.post('/logintest',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({
            status: `message received! (${req.body.message})`
        })
    },
)


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


function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
//get information for registration
app.post('/register', async (req,res,next) => {
    console.log(req.body)
    //missing username
    if(!req.body.username){
        res.status(400).json({error: 'Username is required'}).end();
        return;
    }
    //missing email
    if(!req.body.email){
        res.status(400).json({error: 'Email is required'}).end();
        return;
    }
    //missing password
    if(!req.body.password){
        res.status(400).json({error: 'Password is required'}).end();
        return;
    }
    //missing password confirmation
    if(!req.body.confirm_password){
        res.status(400).json({error: '{Password confirmation is required'}).end();
        return;
    }
    //passwords do not match
    if(req.body.password != req.body.confirm_password){
        res.status(400).json({error: 'Passwords do not match'}).end();
        return;
    }
    if(req.body.password.length < 6){
        res.status(400).json({error: 'Password must be at least 6 characters'}).end();
        return;
    }
    try{
        const user = await User.findOne({username: req.body.username}).lean().exec();
        if(user){
            res.status(401).json({error: 'User already exists'}).end();
            return;
        }
    }catch(err){
        res.status(500).json({error: 'Server error'}).end();
    }
    //bcrypt password here
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        id: getRandomInt(10000000000), 
    })
    try{
        newUser.save()
        .then(() => {console.log('new user created' + newUser)})
    }catch(err){
        console.log('couldnt save user')
    }
    res.json({
        success: true,
        status: 'Success!'
    })
})



 app.post('/login', async (req,res,next) => {
    console.log(req.body)
    //missing username
    if(!req.body.username){
        res.status(400).json({error: 'Username is required'}).end();
        return;
    }
    //missing password
    if(!req.body.password){
        res.status(400).json({error: 'Password is required'}).end();
        return;
    }

    try{
        const user = await User.findOne({username: req.body.username}).lean().exec();
        if(!user){
            res.status(401).json({error: 'User not found'}).end();
            return;
        }
        else {
            bcrypt.compare(req.body.password, user.password, function(err, response) {
                if(response){
                    //success! generate a token
                    const payload = {id: user.id, username: user.username}
                    const token = jwt.sign(payload, jwtOptions.secretOrKey)
                    res.json({success: true, username: user.username, token: token})
                }else{
                    res.status(401).json({error: 'Password does not match records'}).end();
                    return;
                }
            })

        }
    }catch(err){
        res.status(500).json({error: 'Server error'}).end();
    }
     
})

app.get('/logout',  (req, res) => {
    res.json({
        success: true,
        message: 'Ok'
    })
})

app.get('/games', async (req,res,next) => {
    // if(process.env.DEBUG){
    //     res.json({id1: 1, id2: 2})
    // }else{
    //     axios.get(`https://my.api.mockaroo.com/game_test_two.json?key=77851f20`) //list of games
    //     .then(response => res.json(response.data))
    //     .catch(err => next(err))
    // }
    try {
        const games = await gameScheme.find({}).lean().exec()
        return res.render('/games', {
            games,
        })
    } catch(err) {
        return next(err)
    }
})


app.get('/username/:id', async (req,res,next) => {
    try{
        const user = await User.findOne({id: req.params.id}).lean().exec();
        if(!user){
            res.status(401).json({error: 'User not found'}).end();
            return;
        }else {
            res.json({
                username: user.username
            })
        }
    }catch(err){
        res.status(500).json({error: 'Server error'}).end();
    }
})
app.get("/games/:id", async (req, res, next) => {
    try {
        const game = await gameScheme.findOne({id: req.params.id}).lean().exec();
        if(!game) {
            res.status(404).json({error: "Game doesnt exist"}).end();
        }
        else{
            res.json({
                data: game
            })
        }
    } catch(err) {
        res.status(500).json({error: "Server error"}).end();
    }
})

app.post('/upload'), (req,res,next) => {
    console.log(req.body)
}


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // store files into a directory named 'games'
      cb(null, "./Games")
    },
    filename: function (req, file, cb) {
      // rename the files to include the current time and date
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
  })

var upload = multer({ storage: storage })

const game_upload = upload.fields([{name: 'thumbnail', maxCount: 1}, {name: 'game_files', maxCount: 10}])


//Upload game
app.post('/upload/:userid',
     passport.authenticate("jwt", { session: false }),
     game_upload,
    async (req,res,next) => {

        const id   = req.body.id;
        const title = req.body.title;
        const description = req.body.description;
        const userid = req.params.userid;
        const thumb = req.files['thumbnail'][0].filename;
        const thepath = []
        for(let i = 0; i < req.files['game_files'].length; i++){
           thepath.push(req.files['game_files'][i].filename);
        }
        fs.copyFile('./Games/' + thumb, './public/images/' + thumb, (err) => {
            if (err) throw err;
            console.log('Thumbnail copied');
        });
        console.log(`${id} ${title} ${description} ${thumb} ${thepath}`);

        if(!id || !title || !description || !thumb || !thepath)
        {
            console.log(`${id} ${title} ${description} ${thumb} ${thepath}`);

            res.json({
                success: false,
                error: "game failed to upload."
            })
        }
        else
        {
            console.log("successful upload here");

            const new_game = new gameScheme({
                id                  : id,
                title               : title,
                description         : description,
                userid              : userid,
                thumb               : thumb,
                path                : thepath
            });

            // notify mongoose to save changes
            new_game.save( (err,res) => {
                if(err)
                    console.log(err);
                else
                    console.log(res);
            });

            res.json({
                success: true
            });
        }

})

//return id's of users games
app.get('/user_games/:userid', (req,res,next) => {
    const userid = req.params.userid;
    gameScheme.find({userid: userid}, (err, games) => {
        if(err)
            console.log(err);
        else{
            const game_data = games.map(game => {
                return {
                    id: game.id,
                    title: game.title,
                    description: game.description,
                    thumb: game.thumb,
                    path: game.path,
                    userid: game.userid
                }
            })
            res.json(game_data);
        }
    })
    
})

app.post("/games_search", async (req, res, next) => {
    console.log(req.body)
    if(!req.body.id) {
        res.status(400).json({error: 'without an ID you cant get a game!' })
    }
    else {
        //compare id with database when available
        try {
            const game = await gameScheme.findOne({id: req.body.id}).lean().exec();
            if(!game) {
                res.status(404).json({error: "Game doesnt exist"}).end();
            }
            else{
                res.json({
                    data: game
                })
            }
        } catch(err) {
            res.status(500).json({error: "Server error"}).end();
        }
    }
    res.json({status: "Return game info here"})
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
