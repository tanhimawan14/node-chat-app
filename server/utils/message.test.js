const expect = require('expect');

var {generatedMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate correct message object', () => {
		var from = 'Jen';
		var text = 'Some message';
		var message = generatedMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, text});
	});
});