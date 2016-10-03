// NodePress by Nioel Studios(R) 2016
"use strict"

class NodePress {

	constructor(){
		/* External Dependencies */
		this.mongoClient = null;
		this.httpServer = null;

		/* Internal Dependencies */
		this.socket = null;

		/* Objects */
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

		/* Variables */
		this.ready = false;
		this.postsCount = null;
		this.mongoURL = null;
		this.postsPerPage = 5;
		this.analytics = {
			"pageviews":0,
			"online":0
		};
		this.port = null;
		this.postsColl = 'posts';

		/* Functions */
		var self = this;
		this.socketFunc = function(socket){
			self.alter('analytics.pageviews', self.analytics.pageviews++);
			self.alter('analytics.online', self.analytics.online++);
			socket.on('disconnect', function(){
				self.alter('analytics.online', self.analytics.online--);
			});
		};
	}

	db_find(coll, a, cb){
		if (typeof cb == 'function'){
			var self = this;
			this.mongoClient.connect(this.mongoURL, function(err, db){
				db.collection(coll).find(a).toArray(function(err, docs){
					cb(err, docs);
					db.close();
				});
			});
		} else {
			throw new Error('Callback is not a function!');
		}
	}

	db_insert(coll, a, cb){
		if (typeof cb == 'function'){
			var self = this;
			this.mongoClient.connect(this.mongoURL, function(err, db){
				db.collection(coll).insert(a, function(err, result){
					cb(err, result);
					db.close();
				});
			});
		} else {
			throw new Error('Callback is not a function!');
		}
	}

	alter(a, b){
		this[a] = b;
	}

	config(opts){
		if (opts.mongoClient && opts.mongoURL){
			this.mongoClient = opts.mongoClient;
			this.mongoURL = opts.mongoURL;
			if (opts.port) {
				this.port = opts.port;
				if (opts.postsCollection){
					this.postsColl = opts.postsCollection;
				}
			} else if (opts.httpServer){
				this.httpServer = opts.httpServer;
			} else {
				throw new Error("You need to mention a port or an http.Server object in the config!");
			}
			return this;
		} else {
			throw new Error("mongoClient and mongoURL need to be mentioned in the config object!");
		}
	}

	init(cb){
		if (typeof cb == 'function' && this.mongoClient && this.mongoURL && (this.httpServer || this.port)){
			var self = this;
			this.db_find(this.postsColl, {}, function(err, docs){
				if (!err){
					self.initSocket();
					self.alter('postsCount', docs.length);
					self.alter('ready', true);
					cb(null);
				} else {
					throw new Error(err);
				}
			})
		} else if (typeof cb != 'function'){
			throw new Error('Callback is not a function!')
		} else {
			cb('Call config() with mongodb object, mongodb URL and a port or an http.Server before initializing!');
		}
	}

	initSocket(){
		var self = this;
		this.socket = require('socket.io').listen(this.httpServer);
		this.socket.on('connection', function(socket){
			self.socketFunc(socket);
		});
	}

	on(on, func){
		if (this.ready){
			var self = this;
			var newSocketFunc = function(socket){
				self.socketFunc(socket);
				socket.on(on, function(data){
					func(socket.id, data);
				});
			}
			this.socket.on('connection', function(socket){
				newSocketFunc(socket);
			});
		} else {
			throw new Error('You need to initialize NodePress before adding socket listeners!');
		}
	}

	validatePD(pd){
		var notFound = new Array();
		if (!pd.title){
			notFound.push('title');
		}
		if (!pd.body){
			notFound.push('body');
		}
		if (!pd.author){
			notFound.push('author');
		}
		return notFound;
	}

	post(pd, cb){
		if (this.ready && typeof pd == 'object' && typeof cb == 'function'){
			if (this.validatePD(pd).length == 0) {
				pd.date = new Date().getTime();
				this.postsCount++;
				pd.post_id = this.postsCount;
				this.db_insert(this.postsColl, pd, function(err, result){
					if (!err){
						cb(null, result);
					} else {
						cb(err);
					}
				})
				cb(null);
			} else {
				var notFound = this.validatePD(pd);
				var fields = '';
				var err = 'You did not add '+fields+' to the PostData object!';
				for (var i = 0; i < notFound.length; i++) {
					fields += (i > 0) ? ', ' + notFound[i] : notFound[i];
				}
				cb(err);
			}
		} else if (typeof cb != 'function'){
			throw new Error('Callback is not a function!');
		} else if (!this.ready) {
			cb('NodePress is not initializated yet!');
		} else {
			cb('PostData is not an object!');
		}
	}

	getPostsFromPage(pg, cb){
		if (typeof cb == 'function'){
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
			this.db_find(this.postsColl, {"post_id":{$gt: (min_id), $lt:(max_id+1)}}, function(err, docs){
				if (err) { throw err };
				if (docs.length == 0){
					console.log('There are no posts in the page requested!');
					last = true;
				}
				cb({posts:docs,last:last});
			});
		} else {
			throw new Error('Callback is not a function!');
		}
	}
}

module.exports = NodePress;