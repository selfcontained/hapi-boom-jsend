var Payload = require('./payload');

module.exports = function() {
	var Handler = function(req, reply) {
		// transform boom payload to jsend
		if(req && req.response && req.response.isBoom) {
			Handler.transform(req.response.output.payload);
		}

		reply.continue();
	};

	Handler.transform = function(data) {
		var payload = new Payload(data);

		return payload.transform();
	};

	return Handler;
};
