// 1. schema defines the contents of an object
// 2. model defines the schema/compiles the schema into something mongoose works with

const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
	comment  : String,
	username : String,
	rating	 : Number,
});

module.exports = Comment;