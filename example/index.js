// Requires
const http = require('http');
const app = require('express')();
const httpServer = http.createServer(app);
const mongoClient = require('mongodb').MongoClient;

// Internal modules
const Utils = require('./Utils.js');
const NodePress = require('./../');
const nodePress = new NodePress();

const path = __dirname + '/client';

app.use(express.static(path));

console.log('Starting HTTP server on port 80');
httpServer.listen(80);

// Change the following details to match your Mongo DB info
const dbInfo = {
	ip: 'localhost',
	port: '27017',
	name: 'myDatabase',
	requireLogon: false,
	user: 'myUser',
	pass: 'myPassword'
}

const mongoURL = NodePress.getMongoURL(dbInfo);

const cfg = {
	mongoClient: mongoClient,
	mongoURL: mongoURL,
	httpServer: httpServer,
	postsPerPage: 15,
	postsCollection: 'posts'
};

nodePress.config(cfg).init(function(err){
	if (err) { throw err }
	console.log('NodePress initializated!');

	// Whenever the user/socket emits 'getPage'
	nodePress.on('getPage', function(user, pg){
		console.log('Requesting page  ' + pg);
		const startTime = new Date().getTime();

		nodePress.getPostsFromPage(pg, function(data){
			// data.last is true if the page the user is requesting
			// is the last page (which cointains the earlier posts)
			var totalTime = new Date().getTime();
			console.log('Request took ' + ((totalTime - startTime)/1000) + 's');

			nodePress.socket.to(user).emit('postsFromPage', {page: pg, posts: data.posts, last: data.last});
		});
	});

	// Whenever the user/socket emits 'post'
	nodePress.on('post', function(user, postData){
		// Check if we have all the information needed
		if (!postData.title || !postData.author || !postData.body)
			return nodePress.socket.to(user).emit('alert', 'You need to fill in all the fields!');

		nodePress.post(postData, function(err){
			if (err) { throw err };
			// Send confirmation to user
			nodePress.socket.to(user).emit('post-added');
		});
	});

});