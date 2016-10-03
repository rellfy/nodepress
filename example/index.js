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

const DB_IP = '';
const DB_PORT = '27017';
const DB_NAME = '';
const DB_REQUIRE_LOGON = false;
const DB_USER = '';
const DB_PASS = '';

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
	
	nodePress.on('getPage', function(user, pg){
		console.log('Requesting page  ' + pg);
		var now = new Date().getTime();
		nodePress.getPostsFromPage(pg, function(data){
			// data.last = true if the page the user is requesting is the last page (which cointains the earlier posts)
			var after = new Date().getTime();
			console.log('Request took ' + ((after - now)/1000) + 's');
			nodePress.socket.to(user).emit('postsFromPage', {"page":pg, "posts":data.posts, "last":data.last});
		});
	});

	nodePress.on('post', function(user, postData){
		// Check if we have all the information needed
		if (postData.title && postData.author && postData.body){
			nodePress.post(postData, function(err){
				if (err) { throw err };
				nodePress.socket.to(user).emit('post-added');
			});
		} else {
			nodePress.socket.to(user).emit('alert', 'You need to fill in all the fields!');
		}
	});

});
