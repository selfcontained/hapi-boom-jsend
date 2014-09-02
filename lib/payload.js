var deap = require('deap');

var Payload = module.exports = function(payload) {
	if(!payload) throw new Error('No payload provided');

	// default status code to 500
	this.code = payload.statusCode || 500;
	this.payload = payload;
};

Payload.prototype = {

	transform: function() {
		var fail = this.isFail(),
			error = this.isError(),
			jsendData = {
				status: fail ? 'fail' : 'error',
				data: {}
			};

		// Provide generic message for "error" if none was provided
		if(error && !this.payload.message) {
			jsendData.message = 'Internal Server Error';
		}

		// move validation => data for a "fail"
		if(fail && this.payload.validation) {
			jsendData.data.validation = this.payload.validation;
			delete this.payload.validation;
		}

		// move message into data for a "fail"
		if(fail && this.payload.message) {
			jsendData.data.message = this.payload.message;
			delete this.payload.message;
		}

		// layer jsend on top of payload
		deap(this.payload, jsendData);

		return this;
	},

	isFail: function() {
		return this.code >= 400 && this.code < 500;
	},

	isError: function() {
		return this.code >= 500;
	}

};
