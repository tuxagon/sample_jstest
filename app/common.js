(function () {
    "use strict";

    var root = this;

    var ns = (function () {
        var self_ = {};

        self_.resolveContext = function (moduleName, moduleObject, context) {
            var node_exports = typeof exports !== 'undefined';
            var node_module = typeof module !== 'undefined';
            var current = { exports: {}, moduleExports: {}, root: {} };

            if (node_module) { moduleExports = current.moduleExports; }
            exports = current.exports || {};
            current.root = root || {};

            if (typeof context !== 'undefined') {
                for (var i = context.length - 1; i >= 0; i--) {
                    var spliced = context.splice(i, 1);
                    if (node_exports) {
                        if (node_module) {
                            self_.resolveContext(context[i], module.exports, spliced);
                        }
                        self_.resolveContext(context[i], exports, spliced);
                    } else {
                        self_.resolveContext(context[i], root, spliced);
                    }
                }
            }

            if (typeof exports !== 'undefined') {
                if (typeof module !== 'undefined' && module.exports) {
                    exports = module.exports = module;
                }
                exports[moduleName] = module;
            } else {
                root[moduleName] = module;
            }
        };

        return self_;
    })();

    ns.resolveContext('ns', ns);
}).call(this);