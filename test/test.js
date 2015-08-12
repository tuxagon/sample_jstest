var has_require = typeof require !== 'undefined';

if (has_require) {
	var chai = require('chai');
	var sinon = require('sinon');
	var test_module = require('../app/functions.js');
	console.log('adsf' + test_module);
}

describe('JavaScript Testing Demo', function () {
	describe('Mocha Chai Demo', function () {
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

		describe('Asynchronous Demo', function () {
			var clock;

			beforeEach(function () {
				clock = sinon.useFakeTimers();
			});

			afterEach(function () {
				clock.restore();
			});

			it('1 + 1 should eventually be 2', function (done) {
				this.timeout = 2000; // optional
				test_module.eventualAdd(1, 1, function (err, sum) {
					chai.expect(sum).to.equal(2);
					done();
				});
				clock.tick(1900);
			});

			it('should send back error if no numbers are passed', function (done) {
				this.timeout = 2000; // optional
				test_module.eventualAdd(null, null, function (err, sum) {
					chai.expect(err).to.be.an.instanceOf(Error);
					done();
				});
				clock.tick(1900);
			});
		});
	});

	describe('Sinon Demo', function () {
		describe('Spies Demo', function () {
			/*
				A test spy is a function that records arguments, return value, the 
				value of this and exception thrown (if any) for all its calls. A 
				test spy can be an anonymous function or it can wrap an existing 
				function.

				Test spies are useful to test both callbacks and how certain functions/methods
				are used throughout the system under test. They are also useful on pre-existing
				functions because they "spy" on the details of the function while also
				allowing the function to behave as normal.
			*/
			it('should spy on callback', function () {
				var spy = sinon.spy();
				test_module.passAlong('Hello', spy);
				// use sinon assertions with sinon because they are 
				// more detailed than chai when it comes to errors
				sinon.assert.calledOnce(spy);
				sinon.assert.calledWith(spy, 'Hello');
			});

			it('should spy on isEven', function () {
				var spy = sinon.spy(test_module, "isEven");

				var result = test_module.isEven(4);

				chai.expect(result).to.be.true;
				chai.assert(spy.returned(true));
				sinon.assert.calledOnce(test_module.isEven);
				sinon.assert.calledWith(test_module.isEven, 4);

				test_module.isEven.restore();
			});
		});

		describe('Stubs Demo', function() {
			/*
				A test stub is a function (spies) with pre-programmed behavior. Just like a spy, it can
				be anonymous or wrap an existing function. When wrapping an existing function, the 
				original function is not called.

				Test stubs are used to control a method's behavior, so that the code will go down a 
				specific path. In addition, when you want to prevent a specific method from being called
				directly (like XMLHttpRequest), then you can use a test stub.
			*/
			it('should successfully stub', function () {
				var stub = sinon.stub();
				stub.withArgs(42).returns(1);
				stub.throws();

				chai.expect(stub(42)).to.equal(1);
				chai.expect(stub).to.throw("Error");
			});
		});

		describe('Mocks Demo', function () {

		});

		describe('Fake Server Demo', function () {

		});
	});
});
