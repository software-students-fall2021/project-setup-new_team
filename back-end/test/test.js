const assert = require('assert');
const request = require('supertest');
const app = require('../app');

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

describe('Register', function() {
    describe('#register', function() {
        it('should return error when no username given', function() {
            request(app).post('/register').send({
                    email: 'mail@mail.com',
                    password: 'password',
                    confirm_password: 'password'
                }).end(function(err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'Username is required');
                }
            );
        })
        
        it('should return error when no email given', async function() {
            request(app).post('/register').send({
                    username: 'username',
                    password: 'password',
                    confirm_password: 'password'
                }).end(function(err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'Email is required');
                }
            );
        })
        it('should return error when no password given', async function() {
            request(app).post('/register').send({
                    username: 'username',
                    email: 'mail@mail.com',
                    confirm_password: 'password'
                }).end(function(err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'Password is required');
                }
            );
        })
        it('should return error when passwords are not equal', async function() {
            request(app).post('/register').send({
                    username: 'username',
                    email: 'mail@mail.com',
                    password: 'password',
                    confirm_password: 'cat dog blueberry'
                }).end(function(err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'Passwords do not match');
                }
            );
        })
        it('should return error when password is less than 6 characters', async function() {
            request(app).post('/register').send({
                    username: 'username',
                    email: 'mail@mail.com',
                    password: 'cat',
                    confirm_password: 'cat'
                }).end(function(err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'Password must be at least 6 characters');
                }
            );
        })
        it('should return success otherwise', async function() {
            request(app).post('/register').send({
                    username: 'username',
                    email: 'mail@mail.com',
                    password: 'password',
                    confirm_password: 'password'
                }).end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.status, 'Success!');
                }
            );
        })
    })
});

describe ('Login', function() {
    describe('#login', function() {
        it('should return error when no username given', function() {
            request(app).post('/login').send({
                    password: 'password'
                }).end(function(err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'Username is required');
                }
            );
        })
        it('should return error when no password given', function() {
            request(app).post('/login').send({
                    username: 'username'
                }).end(function(err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'Password is required');
                }
            );
        })  
        it('should return 401 error if user does not exist', function() {
            request(app).post('/login').send({
                    username: 'i do not exist',
                    password: 'password'
                }).end(function(err, res) {
                    assert.equal(res.status, 401);
                    assert.equal(res.body.error, 'User not found')
                }
            );
        })
        it('should return error if password does not match records',  function() {
            request(app).post('/login').send({
                    username: 'janedoe1',
                    password: 'password'
                }).end(function(err, res) {
                    assert.equal(res.status, 401);
                    assert.equal(res.body.error, 'Password does not match records')
                }
            );
        })
        it('should return success otherwise', function() {
            request(app).post('/login').send({
                    username: 'janedoe1',
                    password: 'password2'
                }).end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert(res.body.token);
                }
            );
        })
        it('should return success when logging out', function() {
            request(app).get('/logout').send().end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.message, 'Ok');
            });
        });
    })
})
describe('Home Page', function() {
    describe('#home', function() {
        //function to make GET request to top articles/games
        it('should return two IDs when querying for top games', async function() {
            request(app).get('/static/top_games.json').end(function(err, res) {
                assert(res.body.id1);
                assert(res.body.id2);
                assert(Number.isInteger(res.body.id1));
                assert(Number.isInteger(res.body.id2));
            });
        })
        it('should return two IDs when querying for top articles', async function() {
            request(app).get('/static/top_articles.json').end(function(err, res) {
                assert(res.body.id1);
                assert(res.body.id2);
                //articles are not guaranteed to be integers: this is intended
            });
        })
    })
})
setTimeout(function() {
    process.exit();
}, 10000);
/*
deprecated functions: update tests
describe('Article', function() {
    describe('#article', function() {
        //function to make GET request to articles
        function makeRequest(x){
            return new Promise(resolve => {
                axios.get(`http://localhost:3000/articles_data/${x}`)
                    .then(res => {resolve(res.data);})
                    .catch(err => {resolve(err.response.data);});
            });
        }
        //should be a test for invalid ID but right now database isn't integrated, so all IDs are valid
        it('should return page with correct parameters', async function() {
            const result = await makeRequest(getRandomInt(10000));
            assert(result.type);
            assert(result.type === 'article');
            assert(result.title);
            assert(result.id);
            assert(result.rating);
            assert(result.lorem);
        })
        it('should return page with proper id', async function() {
            const id = getRandomInt(10000);
            const result = await makeRequest(id);
            assert(result.id == id);
        })
    })
})

describe ('Game', function() {
    describe('#game', function() {
        //function to make GET request to games
        function makeRequest(x){
            return new Promise(resolve => {
                axios.get(`http://localhost:3000/games_data/${x}`)
                    .then(res => {resolve(res.data);})
                    .catch(err => {resolve(err.response.data);});
            });
        }
        //should be a test for invalid ID but right now database isn't integrated, so all IDs are valid
        it('should return page with correct parameters', async function() {
            const result = await makeRequest(getRandomInt(10000));
            assert(result.type);
            assert(result.type === 'game');
            assert(result.title);
            assert(result.id);
            assert(result.rating);
            assert(result.lorem);
        })
        it('should return page with proper id', async function() {
            const id = getRandomInt(10000);
            const result = await makeRequest(id);
            assert(result.id == id);
        })
    })
})


*/