var Lab = require('lab'),
	hapi = require('hapi'),
	HapiBoomJsend = require('../index');

module.exports = function testError(kaboom, expected, done) {
	var server = hapi.createServer();

	server.route({
		method: 'GET',
		path: '/',
		handler: function(req, reply) {
			reply(kaboom);
		}
	});

	server.pack.register(
		{
			plugin: HapiBoomJsend
		},
		function(err) {
			Lab.assert.isUndefined(err);

			server.inject({
				method: 'GET',
				url: '/'
			}, function(res) {
				var payload = JSON.parse(res.payload);

				Lab.assert.deepEqual(payload, expected);

				done();
			});
		}
	);

};
