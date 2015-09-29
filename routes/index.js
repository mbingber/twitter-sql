var express = require('express')

var router = express.Router()

var tweetbank = require('../tweetbank.js')

var Promise = require('bluebird');

module.exports = router

// home
router.get('/', function(req, res, next) {
  tweetbank.list().then(
  	function(tweets) {
  		// console.log("TWEETS INSIDE THEN: ", tweets);
  		res.render('index', {tweets: tweets, showForm: true})
  	}).catch(function(err) {
  		if (err) throw err;
  	});
})

// make a tweet
router.post('/', function(req, res, next) {
	tweetbank.add(req.body.name, req.body.tweet).then(
		function(tweet){
			res.redirect('/')
		})
})

// getting all tweets from user
router.get('/users/:name', function(req, res, next) {
  tweetbank.find(req.params)
  .then(function(tweets){
  	res.render('index', { tweets: tweets, showForm: false })
  }).catch(function(err) {
  	if(err) throw err;
  })
})

// get a single tweet
router.get('/users/:name/tweets/:id', function(req, res, next) {
  req.params.id = Number(req.params.id)
  var properties = {users:{name: req.params.name} , id: req.params.id}
  tweetbank.find(properties)
  .then(function(tweets) {
  	res.render('index',{ tweets: tweets, showForm: false })
  })
})










