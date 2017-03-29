# NodePress
Lightweight, dynamic blog engine for Node.

NodePress is a blog engine for Node web servers. It's designed to be fast to use and attach to your existing project.

## Technology

NodePress uses Mongo for database and Express/Socketio for client-server communication.

## How to

**1.** Get NodePress `npm install nodepress`

**2.** Add it to your project by using

```javascript
const NodePress = require('nodepress');
const nodePress = new NodePress();
```

**3.** Configure NodePress according to your project

```javascript
// Your database info
const databaseInfo = {
	ip: 'localhost',
	port: '27017',
	name: 'myDb',
	requireLogon: 'false',
	user: 'myUser',
	password: 'myPassword'
};

const cfg = {
	mongoClient: require('mongodb').MongoClient, // the mongodb client
	mongoURL: NodePress.getMongoURL(databaseInfo), // get mongoURL by databaseInfo
	httpServer: require('http').createServer(), // a HTTP server
	postsPerPage: 10, // how many posts per page to fetch
	postsCollection: 'posts' // posts' collection name
};

nodePress.config(cfg);
```

**4.** Initialize NodePress and add listeners.

```javascript
nodePress.init(() => {
	// Whenever the user/socket emits 'getPage'
	nodePress.on('getPage', (user, pg) => {
		console.log('Requesting page  ' + pg);
		const startTime = new Date().getTime();

		nodePress.getPostsFromPage(pg, (data) =>{
			// data.last is true if the page the user is requesting
			// is the last page (which cointains the earlier posts)
			var totalTime = new Date().getTime();
			console.log('Request took ' + ((totalTime - startTime)/1000) + 's');

			// This will be emitted to the client through Socket.io
			nodePress.socket.to(user).emit('postsFromPage', {page: pg, posts: data.posts, last: data.last});
		});
	});

	// Whenever the user/socket emits 'post'
	nodePress.on('post', (user, postData) => {
		// Check if we have all the information needed
		if (!postData.title || !postData.author || !postData.body)
			// This will be emitted to the client through Socket.io
			return nodePress.socket.to(user).emit('alert', 'You need to fill in all the fields!');

		nodePress.post(postData, (err) => {
			if (err) { throw err };
			// This will be emitted to the client through Socket.io
			nodePress.socket.to(user).emit('post-added');
		});
	});
});
``` 

**5.** Take a look at the client examples in the folder /example/client to setup Socket.io in the client.

## License

MIT License
