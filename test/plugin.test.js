var Lab = require('lab'),
	hapi = require('hapi'),
	lab = exports.lab = Lab.script(),
	HapiBoomJsend = require('../index');

lab.experiment('Hapi plugin', function() {

	lab.test('should register', function(done) {
		var server = hapi.createServer();

		server.pack.register(
			{
				plugin: HapiBoomJsend
			},
			function(err) {
				Lab.assert.isUndefined(err);

				done();
			}
		);
	});

});
