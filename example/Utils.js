class Utils {

	static getMongoURL(ip, port, name, requireLogon, user, pass) {
		return (requireLogon) ? ('mongodb://'+user+':'+pass+'@'+ip+':'+port+'/'+name) : ('mongodb://'+ip+':'+port+'/'+name);
	}
}

module.exports = Utils;