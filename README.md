# NodePress
Lightweight, dynamic blog engine for Node.

NodePress is an API-styled blog engine for Node software and servers. It will make the backend faster for you when developing a blog. NodePress uses Mongo as its DB and Socketio/Express for server-client communication. NodePress was built to be a fast and light alternative for blog integrations with Node, which should work for any website.

## How to

**1.** Install it with `npm install nodepress` or `git clone https://github.com/Rellfy/NodePress/`

**2.** Add it to your server by using

```javascript
const NodePress = require('nodepress');
const nodePress = new NodePress();
```

**3.** Configure NodePress by using 

```javascript
nodePress.config(cfg);
```

Where `cfg` is an object with the following values

`mongoClient` - MongoClient object (`require('mongodb').MongoClient`);  
`mongoURL` - You can get the connection URL by calling `NodePress.getMongoURL` with the following parameters:  
	`ip` - Database's IP (string)  
	`port` - Database's port (string)  
	`name` - Database's name (string)  
	`requireLogon` - Whether your database requires an user and password (bool, optional)  
	`user` - Database's user (string, optional)  
	`password` - Database's password (string, optional)  
`httpServer` - An instance of require('http')  
`postsPerPage` - How many posts to load per page (int)  
`postsCollection` - Database's collection name to store post documents (string)  

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

			nodePress.socket.to(user).emit('postsFromPage', {page: pg, posts: data.posts, last: data.last});
		});
	});

	// Whenever the user/socket emits 'post'
	nodePress.on('post', (user, postData) => {
		// Check if we have all the information needed
		if (!postData.title || !postData.author || !postData.body)
			return nodePress.socket.to(user).emit('alert', 'You need to fill in all the fields!');

		nodePress.post(postData, (err) => {
			if (err) { throw err };
			// Send confirmation to user
			nodePress.socket.to(user).emit('post-added');
		});
	});
});
``` 

**5.** You can take a look at the client examples in the folder /example/client

## License

MIT License
