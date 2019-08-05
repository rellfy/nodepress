# NodePress
NodePress is a lightweight blog engine for node.js. At its current state it is useful as a compact library or boilerplate for a modular and extendible blog engine.

NodePress' web server is built on top of [node-router](https://github.com/rellfy/node-router). What is added on top of the server is a plugin functionality which renders one, or multiple, pair or individual set of client and server endpoints. Client endpoints being react components. This can be seen in any of the core plugin implementations, on `/src/plugins`.

# Database
NodePress uses MongoDB and Mongoose as interface by default.

# Post  schema

The following is the default structure of a post object.

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
