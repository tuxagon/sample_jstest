var has_require = typeof require !== 'undefined';

if (has_require) {
	var chai = require('chai');
	var test_module = require('../js/functions.js');
	console.log('adsf' + test_module);
}

describe('Mocha Chai Demonstration', function () {
	before('before hook', function () {
		//console.log('before all tests in block');
	});

	beforeEach('before each', function () {
		//console.log('before each test in block');
	});

	afterEach('after each', function () {
		//console.log('after each test in block');
	});

	after('after hook', function () {
		//console.log('after all tests in block');
	});

	it('1 should equal 1', function () {
		chai.expect(1).to.equal(1);
	});

	it('2 should not equal 1', function () {
		chai.expect(2).to.not.equal(1);
	});

	it('should always return a boolean', function () {
		chai.expect(test_module.isEven(2)).to.be.a('boolean');
	});

	it('1 is not even', function () {
		chai.expect(test_module.isEven(1)).to.be.false;
	});

	it('2 is even', function () {
		chai.expect(test_module.isEven(2)).to.be.true;
	});

	it('1 + 1 should eventually be 2', function (done) {
		this.timeout = 2000; // optional
		test_module.eventualAdd(1, 1, function (err, sum) {
			chai.expect(sum).to.equal(2);
			done();
		});
	});

	it('should send back error if no numbers are passed', function (done) {
		this.timeout = 2000; // optional
		test_module.eventualAdd(null, null, function (err, sum) {
			chai.expect(err).to.be.an.instanceOf(Error);
			done();
		});
	});
});

describe('Sinon Demonstration', function () {

});
