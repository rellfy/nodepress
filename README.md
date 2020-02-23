# NodePress
NodePress is a lightweight blog engine for node.js. At its current state it is useful as a compact library or boilerplate for a modular and extendible blog engine.

NodePress' web server is built on top of [node-router](https://github.com/rellfy/node-router). What is added on top of the server is a plugin functionality which renders one, or multiple, pair or individual set of client and server endpoints. Client endpoints being react components. This can be seen in any of the core plugin implementations, on `/src/plugins`.

# Plugin system
NodePress relies on a plugin system to function. A plugin is an object that indexes frontend (React components) and backend (Fastify routes) endpoints to be served via the server. For that reason, NodePress allows for easily extendible and naturally modular projects. 

## Blog engine
By default, NodePress contains five plugins which make up a simple blog engine that renders markdown and latex math equations (using [marked](https://github.com/markedjs/marked) and [katex](https://github.com/KaTeX/KaTeX)). Those plugins are `reader`, `feed`, `fetch`, `post`, and `user`. You can take a look at the source of those plugins [here](https://github.com/rellfy/nodepress/tree/master/src/plugins). The `user` plugin contains essential user authorisation and management, while the other four make up the blog engine. It is possible to ignore all those plugins by initialising NodePress with the boolean `ignoreCorePlugins`. If you ignore core plugins, you can still manually load one or many of them, such as if you wish to use the `user` plugin but not provide a blog.

# Initialisation example
```javascript
const NodePress = require('NodePress');
const path = require('path');

const isDevEnv = process.argv.includes('--dev');
const args = {
	// Make config.json and set it up with an actual MongoDB URI.
	config: path.resolve(__dirname, 'config.json'),
	// Path to body and head HTML files.
	layout: {
		body: path.resolve(__dirname, 'layout/body.html'),
		head: path.resolve(__dirname, 'layout/head.html')
	},
	// Do not add any plugins to this example...
	plugins: [],
	//...but do not ignore core plugins.
	ignoreCorePlugins: false,
	// If dev environment, run on HTTP instead of HTTPS.
	dev: isDevEnv
};

// Start instance.
const instance = new NodePress(args);
```

## Config.json example
```json
{
    "net": {
        "interface": {
            "ports": {
                "https": 8080
            },
            "https": {
                "cert": "./some/path/fullchain.pem",
                "key": "./some/path/privkey.pem"
            }
        }
    },
    "db": {
        "uri": "mongodb_uri"
    },
    "user": {
        "root": {
            "password": "root_user_password"
        },
        "secret": {
            "key": "some_secret_encryption_key"
        }
    },
    "api": {
        "np_epoch": 1550620800000
    }
}
```


# Database
NodePress uses MongoDB for database and Mongoose as interface by default.

# Post  schema

The following is the default structure of a post object, as used by the core `post`, `reader`, `fetch` and `feed` plugins.

```javascript
{
	_id: ObjectId
	title: string
	content: string
	metadata: {
		date: Date
		author: string
		...
	}
}
```

## License

MIT
