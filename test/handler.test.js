var Lab = require('lab'),
	lab = exports.lab = Lab.script(),
	Handler = require('../lib/handler');

lab.experiment('hapi-boom-jsend transform', function() {

	lab.experiment('handler', function() {

		lab.test('should instantiate and return a function', function(done) {
			var handler = Handler();

			Lab.assert.isFunction(handler);

			done();
		});

		lab.test('should pass-through w/o a response on the request', function(done) {
			var handler = Handler();

			handler({}, reply(function() {
				Lab.assert.isTrue(true);
				done();
			}));
		});

		lab.test('should pass-through w/ a null request', function(done) {
			var handler = Handler();

			handler(null, reply(function() {
				Lab.assert.isTrue(true);
				done();
			}));
		});

	});

	// return a reply-like interface
	function reply(done) {
		return {
			continue: done
		};
	}

});
