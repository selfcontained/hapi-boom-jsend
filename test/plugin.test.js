var Lab = require('lab'),
	hapi = require('hapi'),
	lab = exports.lab = Lab.script(),
	HapiBoomJsend = require('../index');

lab.experiment('Hapi plugin', function() {

	lab.test('should register', function(done) {
		var server = new hapi.Server();

		server.register(HapiBoomJsend, function(err) {
			Lab.assert.isUndefined(err);

			done();
		});
	});

});
