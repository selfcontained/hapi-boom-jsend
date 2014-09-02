var Handler = require('./lib/handler');

exports.register = function(plugin, options, done) {

	plugin.ext('onPreResponse', Handler());

	done();
};

exports.register.attributes = {
	pkg: require('./package.json')
};
