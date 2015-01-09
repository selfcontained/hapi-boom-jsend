var Lab = require('lab'),
	hapi = require('hapi'),
	http = require('http'),
	HapiBoomJsend = require('../index');

module.exports = function testError(kaboom, expected, done) {
	var server = new hapi.Server().connection();

	server.route({
		method: 'GET',
		path: '/',
		handler: function(req, reply) {
			reply(kaboom);
		}
	});
	server.register(HapiBoomJsend, function(err) {
		Lab.assert.isUndefined(err);

		server.inject({
			method: 'GET',
			url: '/'
		}, function(res) {
			var payload = JSON.parse(res.payload);

			Lab.assert.deepEqual(payload, expected);

			done();
		});

	});

};
