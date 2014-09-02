var Lab = require('lab'),
	lab = exports.lab = Lab.script(),
	Payload = require('../lib/payload');

lab.experiment('Payload', function(){

	lab.test('should require a payload', function(done) {
		Lab.assert.throws(function() {
			new Payload();
		});
		done();
	});

	lab.test('should default to a 500', function(done) {
		var payload = new Payload({

		});

		Lab.assert.equal(payload.code, 500);

		done();
	});

	lab.experiment('isFail', function(done) {

		lab.test('401', function(done) {
			var payload = new Payload({ statusCode: 401 });

			Lab.assert.isTrue(payload.isFail());
			done();
		});

		lab.test('200', function(done) {
			var payload = new Payload({ statusCode: 200 });

			Lab.assert.isFalse(payload.isFail());
			done();
		});

	});
});
