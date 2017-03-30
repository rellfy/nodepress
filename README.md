# NodePress
Lightweight, dynamic blog engine for Node.

NodePress is a blog engine for Node web servers. It's designed to be fast to use and attach to your existing project. It works like a bridge between your database and the client, making it simple to have users posting and fetching posts.

## Technology

NodePress uses Mongo as database and Express/Socket.io for client-server communication.

## How to

**1.** Get NodePress `npm install nodepress`

**2.** Add it to your project by using

```javascript
const NodePress = require('nodepress');
const nodePress = new NodePress();
```

**3.** Configure NodePress according to your project/database variables and information.

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
		// Check if we have all the information we want
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

**5.** Initialize [Socket.io](https://www.npmjs.com/package/socket.io) in the client and listen for server events.

```javascript
	const socket = io();

	var page = 1;

	// Will request posts from page '1'
	socket.emit('getPage', page);

	socket.on('postsFromPage', function(data) {
		// In case of an infinite-scrolling blog, we would want
		// to increase the page number after getting posts
		page++;

		// Reverse posts list in case you want
		// to show them by latest -> earliest (top -> bottom)
		var posts = data.posts.reverse();

		// last is true if that's the last page available
		var last = data.last;

		for (let i = 0; i < posts.length; i++) {
			// Append a new post box for every post at the current page
			var p = '<div class="post">\
						<div class="top">\
							<span class="title">'+posts[i].title+'</span>\
							<span class="info">\
								by <span class="author">'+posts[i].author+'</span><br>\
								on <span class="date">'+getPostDate(posts[i].date)+'</span>\
							</span>\
						</div>\
						<div class="body">\
							<p>'+posts[i].body+'</p>\
						</div>\
					</div>';

			$('.timeline').append(p);
		}

		// If there are more pages, show the "Load More" button
		if (!last) {
			$('.timeline').append('<div class="load-more">Load More</div>');
		}
	});

```

**6.** To publish a post in the client is very simple. According to the above server socket listener 'post':

```javascript
	var post = {
		title: 'My Title'.
		author: 'My Name',
		body: 'Hi there!'
	};

	socket.emit('post', post);
```

**7.** For a full Client example, please check the /example/client folder files.

## License

MIT License
