require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const _ = require("lodash") // the lodash module has some convenience functions for arrays that we use to sift through our mock user data... you don't need this if using a real database with user info

const mongoose = require("mongoose")

const uri = process.env.MONGODB_URI;
if(uri){mongoose.connect(uri)}

const User = mongoose.model('User')


// set up some JWT authentication options
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT") // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_KEY ? process.env.JWT_KEY : "string to make circle ci happy" // an arbitrary string used during encryption - see the .env file
// console.log(jwtOptions) // debug to make sure the secret from the .env file is loaded correctly
// passport can work with many authentication systems... here we are setting some middleware code for using JWT that we'll pass to passport to use
const jwtStrategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {

  // console.log("JWT payload received", jwt_payload) // debugging

  // try to find a matching user in our database
  const user = await User.findOne({id: jwt_payload.id}).lean().exec();
  if (user) {
    // we found the user... keep going
    console.log(user)
    next(null, user)
  } else {
    // we didn't find the user... fail!
    next(null, false)
  }
})

module.exports = {
  jwtOptions,
  jwtStrategy,
}