var Payload = require('./lib/payload');

module.exports = function() {

	var Handler = function(req, next) {
		// transform boom payload to jsend
		if(req && req.response && req.response.isBoom) {
			Handler.transform(req.response.output.payload);
		}

		next();
	};

	Handler.transform = function(data) {
		var payload = new Payload(data);

		return payload.transform();
	};

	return Handler;
};
