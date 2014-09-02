var Lab = require('lab'),
	hapi = require('hapi'),
	boom = require('boom'),
	Joi = require('joi'),
	jsend = require('jsend'),
	lab = exports.lab = Lab.script(),
	HapiBoomJsend = require('../index');

lab.experiment('hapi-boom-jsend transform', function() {
	var MESSAGE = "Mayyybe sometheeng bad... mayyyybe sometheeng good... I guess we'll never know!";

	lab.experiment('handler', function() {

		lab.test('should instantiate and return a function', function(done) {
			var handler = HapiBoomJsend();

			Lab.assert.isFunction(handler);

			done();
		});

		lab.test('should pass-through w/o a response on the request', function(done) {
			var handler = HapiBoomJsend();

			handler({}, function() {
				Lab.assert.isTrue(true);
				done();
			});
		});

		lab.test('should pass-through w/ a null request', function(done) {
			var handler = HapiBoomJsend();

			handler(null, function() {
				Lab.assert.isTrue(true);
				done();
			});
		});

	});

	lab.experiment('400', function() {

		lab.test('no message', function(done) {
			testError(boom.badRequest(), {
				status: 'fail',
				error: 'Bad Request',
				statusCode: 400,
				data: {}
			}, done);
		});

		lab.test('a message', function(done) {
			testError(boom.badRequest(MESSAGE), {
				status: 'fail',
				error: 'Bad Request',
				statusCode: 400,
				data: { message: MESSAGE }
			}, done);
		});

	});

	lab.experiment('input validation', function() {

		lab.test('without proper validation', function(done) {
			var server = hapi.createServer();

			server.route({
				method: 'POST',
				path: '/',
				handler: function(req, reply) {
					reply(jsend.success({saved:true}));
				},
				config: {
					validate: {
						payload: {
							id: Joi.number()
						}
					}
				}
			});

			server.ext('onPreResponse', HapiBoomJsend());

			server.inject({
				method: 'POST',
				url: '/',
				payload: {
					id: 'asdf'
				}
			}, function(res) {
				var payload = JSON.parse(res.payload);

				Lab.assert.deepEqual(payload, {
					statusCode: 400,
					error: 'Bad Request',
					status: 'fail',
					data: {
						message: 'id must be a number',
						validation: {
							source: 'payload',
							keys: ['id']
						}
					}
				});

				done();
			});
		});

		lab.test('with proper validation', function(done) {
			var server = hapi.createServer();

			server.route({
				method: 'POST',
				path: '/',
				handler: function(req, reply) {
					reply(jsend.success({saved:true}));
				},
				config: {
					validate: {
						payload: {
							id: Joi.number()
						}
					}
				}
			});

			server.ext('onPreResponse', HapiBoomJsend());

			server.inject({
				method: 'POST',
				url: '/',
				payload: {
					id: 1234
				}
			}, function(res) {
				var payload = JSON.parse(res.payload);

				Lab.assert.deepEqual(payload, {
					status: 'success',
					data: {
						saved: true
					}
				});

				done();
			});
		});

	});

	lab.experiment('502', function() {

		lab.test('no message', function(done) {
			testError(boom.badGateway(), {
				status: 'error',
				error: 'Bad Gateway',
				statusCode: 502,
				data: {},
				message: 'Internal Server Error'
			}, done);
		});

		lab.test('a message', function(done) {
			testError(boom.badGateway(MESSAGE), {
				status: 'error',
				error: 'Bad Gateway',
				statusCode: 502,
				data: {},
				message: MESSAGE
			}, done);
		});

	});

	function testError(kaboom, expected, done) {
		var server = hapi.createServer();

		server.route({
			method: 'GET',
			path: '/',
			handler: function(req, reply) {
				reply(kaboom);
			}
		});

		server.ext('onPreResponse', HapiBoomJsend());

		server.inject({
			method: 'GET',
			url: '/'
		}, function(res) {
			var payload = JSON.parse(res.payload);

			Lab.assert.deepEqual(payload, expected);

			done();
		});
	}

});
