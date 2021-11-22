// 1. schema defines the contents of an object
// 2. model defines the schema/compiles the schema into something mongoose works with

const mongoose = require('mongoose');
//const { Schema } = mongoose;

const Article = mongoose.model('Article', {
	/*title*/  article_name    : String,
	/*author*/ poster_name     : String,
	/*body*/   article_text    : String,
			   image_url 	   : String,
			   date	  		   : { type: Date, default: Date.now },
			   comments  	   : [{ comment: String, username: String, rating: Number }],
			   rating	       : Number,
});

module.exports = Article;