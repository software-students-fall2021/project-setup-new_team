const assert = require('assert');
const { default: axios } = require('axios');


function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

describe('Register', function() {
    describe('#register', function() {
        //function to make POST request to register
        function makeRequest(x){
            return new Promise(resolve => {
                axios.post('http://localhost:3000/register', x)
                .then(function (response) {
                    resolve(response.data.status);
                })
                .catch(function (error) {
                    resolve(error.response.data.error);
                });
            });
        }
        it('should return error when no username given', async function() {
            const result = await makeRequest({
                email: 'email@mail.dom',
                password: 'password',
                confirm_password: 'password'
            })
            assert.equal(result, 'Username is required');
        })
        it('should return error when no email given', async function() {
            const result = await makeRequest({
                username: 'username',
                password: 'password',
                confirm_password: 'password'
            })
            assert.equal(result, 'Email is required');
        })
        it('should return error when no password given', async function() {
            const result = await makeRequest({
                username: 'username',
                email: 'email@mail.dom',
                confirm_password: 'password'
            })
            assert.equal(result, 'Password is required');
        })
        it('should return error when passwords are not equal', async function() {
            const result = await makeRequest({
                username: 'username',
                email: 'email@mail.dom',
                password: 'password',
                confirm_password: 'pasdlila'
            })
            assert.equal(result, 'Passwords do not match');
        })
        it('should return error when password is less than 6 characters', async function() {
            const result = await makeRequest({
                username: 'username',
                email: 'email@mail.dom',
                password: 'pass',
                confirm_password: 'pass'
            })
            assert.equal(result, 'Password must be at least 6 characters');
        })
        it('should return success otherwise', async function() {
            const result = await makeRequest({
                username: 'username',
                email: 'email@mail.dom',
                password: 'password',
                confirm_password: 'password'
            })
            assert.equal(result, 'Success!');
        })
    })
});

describe ('Login', function() {
    describe('#login', function() {
        //function to make POST request to login
        function makeRequest(x){
            return new Promise(resolve => {
                axios.post('http://localhost:3000/login', x)
                .then(function (response) {
                    resolve(response.data.status);
                })
                .catch(function (error) {
                    resolve(error.response.data.error);
                });
            });
        }
        it('should return error when no username given', async function() {
            const result = await makeRequest({
                password: 'password'
            })
            assert.equal(result, 'Username is required');
        })
        it('should return error when no password given', async function() {
            const result = await makeRequest({
                username: 'username'
            })
            assert.equal(result, 'Password is required');
        })  
        it('should return error if password does not match records', async function() {
            const result = await makeRequest({
                username: 'username',
                password: 'not_my_password'
            })
            assert.equal(result, 'Password submitted does not match our records');
        })
        it('should return success otherwise', async function() {
            const result = await makeRequest({
                username: 'username',
                password: 'password'
            })
            assert.equal(result, 'Success!');
        })
    })
})

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

describe('Home Page', function() {
    describe('#home', function() {
        //function to make GET request to top articles/games
        function requestTop(x){
            return new Promise(resolve => {
                axios.get(`http://localhost:3000/top_${x}`)
                    .then(res => {resolve(res.data);})
                    .catch(err => {resolve(err.response.data);});
            });
        }
        it('should return two IDs when querying for top games', async function() {
            const result = await requestTop('games');
            assert(result.id1);
            assert(result.id2);
            assert(Number.isInteger(result.id1));
            assert(Number.isInteger(result.id2));
        })
        it('should return two IDs when querying for top articles', async function() {
            const result = await requestTop('articles');
            assert(result.id1);
            assert(result.id2);
            assert(Number.isInteger(result.id1));
            assert(Number.isInteger(result.id2));
        })
    })
})