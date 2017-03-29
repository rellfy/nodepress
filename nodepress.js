'use strict';

class NodePress {

	constructor(){
		// External Dependencies 
		this.mongoClient = null;
		this.httpServer = null;

		// Internal Dependencies 
		this.socket = null;

		// Objects
		this.posts = {
			/* 
			[{
				id,
				title,
				body,
				author,
				date
			}]
			*/
		};

		// Members
		this.ready = false;
		this.postsCount = null;
		this.mongoURL = null;
		this.postsPerPage = 5;
		this.analytics = {
			pageviews :0,
			online: 0
		};
		this.port = null;
		this.postsColl = 'posts';

		// Functions
		this.socketFunc = (socket) => {
			this.alter('analytics.pageviews', this.analytics.pageviews++);
			this.alter('analytics.online', this.analytics.online++);
			socket.on('disconnect', () =>{
				this.alter('analytics.online', this.analytics.online--);
			});
		};
	}

	static getMongoURL(ip, port, name, requireLogon, user, pass) {
		return (requireLogon) ? ('mongodb://'+user+':'+pass+'@'+ip+':'+port+'/'+name) : ('mongodb://'+ip+':'+port+'/'+name);
	}

	db_find(coll, a, cb){
		if (typeof cb != 'function') throw new Error('Callback is not a function!');

		this.mongoClient.connect(this.mongoURL, (err, db) => {
			db.collection(coll).find(a).toArray((err, docs) => {
				cb(err, docs);
				db.close();
			});
		});
	}

	db_insert(coll, a, cb){
		if (typeof cb != 'function') throw new Error('Callback is not a function!');

		this.mongoClient.connect(this.mongoURL, (err, db) => {
			db.collection(coll).insert(a, (err, result) => {
				cb(err, result);
				db.close();
			});
		});
	}

	alter(a, b){
		this[a] = b;
	}

	config(opts){
		if (!opts.mongoClient || opts.mongoURL)
			throw new Error('mongoClient and mongoURL need to be mentioned in the config object!');
		if (!opts.port && !opts.httpServer) 
			throw new Error('You need to mention a port or an http.Server object in the config!');

		this.mongoClient = opts.mongoClient;
		this.mongoURL = opts.mongoURL;

		if (opts.port) this.port = opts.port;
		if (opts.httpServer) this.httpServer = opts.httpServer;
		if (opts.postsCollection) this.postsColl = opts.postsCollection;

		return this;
	}

	init(cb){
		if (typeof cb != 'function') throw new Error('Callback is not a function!');
		if (!this.mongoClient || !this.mongoURL || (!this.httpServer || !this.port))
			return cb('Call config() with mongodb object, mongodb URL and a port or an http.Server before initializing!');

		this.db_find(this.postsColl, {}, (err, docs) => {
			if (err) throw new Error(err);

			this.initSocket();
			this.alter('postsCount', docs.length);
			this.alter('ready', true);
			cb(null);
		});
	}

	initSocket(){
		this.socket = require('socket.io').listen(this.httpServer);
		this.socket.on('connection', (socket) => {
			this.socketFunc(socket);
		});
	}

	on(on, func){
		if (!this.ready) throw new Error('You need to initialize NodePress before adding socket listeners!');

		var newSocketFunc = (socket) => {
			this.socketFunc(socket);
			socket.on(on, (data) => {
				func(socket.id, data);
			});
		}

		this.socket.on('connection', (socket) => {
			newSocketFunc(socket);
		});
	}

	validatePD(pd){
		var notFound = new Array();
		if (!pd.title) notFound.push('title');
		if (!pd.body) notFound.push('body');
		if (!pd.author) notFound.push('author');
		return notFound;
	}

	post(pd, cb){
		if (typeof cb != 'function') throw new Error('Callback is not a function!');
		if (!this.ready) return cb('NodePress is not initializated yet!');
		if (typeof pd != 'object') return cb('PostData is not an object!');

		if (this.validatePD(pd).length > 0) {
			var notFound = this.validatePD(pd);
			var fields = '';
			var err = 'You did not add '+fields+' to the PostData object!';
			for (var i = 0; i < notFound.length; i++) {
				fields += (i > 0) ? ', ' + notFound[i] : notFound[i];
			}
			return cb(err);
		}

		pd.date = new Date().getTime();
		this.postsCount++;
		pd.post_id = this.postsCount;

		this.db_insert(this.postsColl, pd, (err, result) => {
			if (err) return cb(err);
			cb(null, result);
		});
	}

	getPostsFromPage(pg, cb){
		if (typeof cb != 'function') throw new Error('Callback is not a function!');

		var max_id = (this.postsCount - (this.postsPerPage * pg)) + this.postsPerPage;
		var min_id = this.postsCount - (this.postsPerPage * pg);
		var last = false;

		// If we are in the last page and it is incomplete (post count != posts per page)
		if (pg != 1 && (this.postsCount/this.postsPerPage) != parseInt(this.postsCount/this.postsPerPage)){
			var percentage = ((this.postsCount/this.postsPerPage) * 100) - 100;
			var lastPagePosts = (percentage * this.postsPerPage) / 100;
			max_id = lastPagePosts;
			min_id = 0;
			last = true;
		}

		const find = {
			post_id: {
				$gt: (min_id),
				$lt:(max_id+1)
			}
		}

		this.db_find(this.postsColl, find, (err, docs) => {
			if (err) throw err;

			if (docs.length == 0){
				console.log('There are no posts in the page requested!');
				last = true;
			}

			cb({posts:docs,last:last});
		});
	}
}

module.exports = NodePress;