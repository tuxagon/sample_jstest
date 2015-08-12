"use strict";

(function () {
	var root = this;
	var prev_module = root.test_module;

	var test_module = function () { };

	test_module.isEven = function (num) {
		return num % 2 == 0;
	};

	test_module.add = function (num1, num2) {
		return num1 + num2;
	};

	test_module.eventualAdd = function (num1, num2, cb) {
		setTimeout(function () {
			try {
				cb(null, test_module.add(num1, num2));
			} catch (e) {
				cb(e);
			}
		}, 1900);
	};

	test_module.noConflict = function () {
		root.test_module = prev_module;
		return test_module;
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = test_module;
		}
		exports.test_module = test_module;
	} else {
		root.test_module = test_module;
	}
}).call(this);