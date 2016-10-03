var http = require('http'),
	express = require('express'),
	app = express(),
	httpServer = http.createServer(app),
	mongoClient = require('mongodb').MongoClient,
	NodePress = require('./../'),
	nodePress = new NodePress();

const path = __dirname + '/client';

app.use(express.static(path));

console.log('Starting HTTP server on port 80');
httpServer.listen(80);

// Change the following details to match your Mongo DB info
const DB_IP = '';
const DB_PORT = '27017'; // the default port
const DB_NAME = '';
const DB_REQUIRE_LOGON = false;
const DB_USER = '';
const DB_PASS = '';

// You don't need to change that ;)
const mongoURL = (DB_REQUIRE_LOGON) ? ('mongodb://'+DB_USER+':'+DB_PASS+'@'+DB_IP+':'+DB_PORT+'/'+DB_NAME) : ('mongodb://'+DB_IP+':'+DB_PORT+'/'+DB_NAME);

var cfg = {
	"mongoClient":mongoClient,
	"mongoURL":mongoURL,
	"httpServer":httpServer,
	"postsPerPage":15,
	"postsCollection":"posts" // the collection (table) name for the posts to the used in the DB
};


nodePress.config(cfg).init(function(err){
	if (err) { throw err }
	console.log('NodePress initializated!');

	// Whenever the user/socket emits 'getPage'
	nodePress.on('getPage', function(user, pg){
		console.log('Requesting page  ' + pg);
		var now = new Date().getTime();
		// Call getPostsFromPage function
		nodePress.getPostsFromPage(pg, function(data){
			// data.last = true if the page the user is requesting is the last page (which cointains the earlier posts)
			var after = new Date().getTime();
			console.log('Request took ' + ((after - now)/1000) + 's');
			// Send data to user
			nodePress.socket.to(user).emit('postsFromPage', {"page":pg, "posts":data.posts, "last":data.last});
		});
	});

	// Whenever the user/socket emits 'post'
	nodePress.on('post', function(user, postData){
		// Check if we have all the information needed
		if (postData.title && postData.author && postData.body){
			// Call post function
			nodePress.post(postData, function(err){
				if (err) { throw err };
				// Send confirmation to user
				nodePress.socket.to(user).emit('post-added');
			});
		} else {
			nodePress.socket.to(user).emit('alert', 'You need to fill in all the fields!');
		}
	});

});