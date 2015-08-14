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
}).call(this);