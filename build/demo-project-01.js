/*
demo-project-01 1.0.0- A sample project showing the basics of getting javascript testing up and running
https://github.com/tuxagon/sample_jstest.git
Built on 2015-08-24
*/
(function () {
    'use strict';

    var root = this;
    var exports = {};

    var ns = (function () {
        var self_ = {};

        // Exposed for testing, not actually part of public API
        self_._private = private_;

        self_.resolveContext = function (moduleName, moduleObject, contexts) {
            if (typeof module !== 'undefined' && module.exports) {
                    private_.prepareContext(contexts, module.exports);
                    private_.resolveContext(moduleName, moduleObject, contexts, module.exports);
                    exports = module.exports;
            } else {
                private_.prepareContext(contexts, root);
                private_.resolveContext(moduleName, moduleObject, contexts, root);
            }
        };

        var private_ = {
            resolveContext: function (moduleName, moduleObject, contexts, rootContext) {
                var currentContext = rootContext;
                if (contexts && contexts.length > 0) {
                    private_.resolveContext(moduleName, moduleObject, contexts, currentContext[contexts.splice(0, 1)]);
                } else {
                    currentContext[moduleName] = moduleObject;
                }
            },
            prepareContext: function (contexts, rootContext) {
                var currentContext = rootContext;
                if (currentContext && contexts) {
                    for (var i = 0; i < contexts.length; i++) {
                        currentContext = currentContext[contexts[i]] = currentContext[contexts[i]] || {};
                    }
                }
            }
        };

        return self_;
    })();

    ns.resolveContext('ns', ns);
}).call(this);;
var has_require = typeof require !== 'undefined';

if (has_require) {
	var ns = require('../app/common.js').ns;
}

(function () {
	"use strict";

	var root = this;
	var prev_module = root.test_module;

	var test_module = function () { };

	test_module.isEven = function (num) {
		return num % 2 === 0;
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

	test_module.passAlong = function (msg, cb) {
		cb(msg);
	};

	test_module.getComments = function (cb) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function (e) {
			console.log(e.target.response.substring(0, 100));
			cb(e.target.response);
		};
		xhr.onerror = function (e) {
			console.log('error');
		};
		xhr.open('GET', 'http://jsonplaceholder.typicode.com/comments', true);
		xhr.send();
	};

	test_module.noConflict = function () {
		root.test_module = prev_module;
		return test_module;
	};

	ns.resolveContext('test_module', test_module);
}).call(this);