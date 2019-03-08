const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Post = require("../models/post");
var Location = require("../models/location");

app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

app.post('/add_post', (req, res) => {
	var db = req.db;
	var title = req.body.title;
	var description = req.body.description;
	var new_post = new Post({
		title: title,
		description: description
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

app.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }

	  post.title = req.body.title
	  post.description = req.body.description
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

app.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})

app.get('/locations/:region', (req, res) => {
	console.log(req.params.region)
	if(req.params.region !== 'undefined' && req.params.region !== 'All'){
	  Location.find({'state':req.params.region}, 'title description street city state zip active', function (error, locations) {
	  	if (error) { console.error(error); }
		res.send({
			  locations: locations
		  })
	  }).sort({_id:-1})
	} else {
		Location.find({}, 'title description street city state zip active', function (error, locations) {
			if (error) { console.error(error); }
			res.send({
				  locations: locations
			  })
		  }).sort({_id:-1})
	}
})
app.get('/location_states', (req, res) => {
Location.find().distinct('state', function (error, locations) {
	if (error) { console.error(error); }
	res.send({
			locations: locations
		})
	})
})
  
  app.post('/add_location', (req, res) => {
	  var db = req.db;
	  var title = req.body.title;
	  var description = req.body.description;
	  var street = req.body.street;
	  var city = req.body.city;
	  var state = req.body.state;
	  var zip = req.body.zip;
	  var active = true;

	  var new_location = new Location({
		  title: title,
		  description: description,
		  street: street,
		  city: city,
		  state: state,
		  zip: zip,
		  active: active
	  })
  
	  new_location.save(function (error) {
		  if (error) {
			  console.log(error)
		  }
		  res.send({
			  success: true
		  })
	  })
  })
  
  app.put('/locations/:id', (req, res) => {
	  var db = req.db;
	  Location.findById(req.params.id, 'title description street city state zip active', function (error, location) {
		if (error) { console.error(error); }
  
		location.title = req.body.title
		location.description = req.body.description
		location.street = req.body.street
		location.city = req.body.city
		location.state = req.body.state
		location.zip = req.body.zip

		location.save(function (error) {
			  if (error) {
				  console.log(error)
			  }
			  res.send({
				  success: true
			  })
		  })
	  })
  })
  
  app.delete('/locations/:id', (req, res) => {
	//  var db = req.db;
	//   Location.remove({
	// 	  _id: req.params.id
	//   }, function(err, location){
	// 	  if (err)
	// 		  res.send(err)
	// 	  res.send({
	// 		  success: true
	// 	  })
	//   })

	  var db = req.db;
	  Location.findById(req.params.id, 'title description street city state zip active', function (error, location) {
		if (error) { console.error(error); }
  
		location.active = false

		location.save(function (error) {
			  if (error) {
				  console.log(error)
			  }
			  res.send({
				  success: true
			  })
		  })
	  })
  })
  
  app.get('/location/:id', (req, res) => {
	  var db = req.db;
	  Location.findById(req.params.id, 'title description street city state zip active', function (error, location) {
		if (error) { console.error(error); }
		res.send(location)
	  })
  })

app.listen(process.env.PORT || 8081)
