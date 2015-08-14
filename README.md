# JavaScript Testing Set Up for Browser & Node.js

This set up uses
* Mocha http://mochajs.org/
* Chai http://chaijs.com/
* Node https://nodejs.org/ 
* Bower http://bower.io/
* Sinon http://sinonjs.org/

----

1. Install node.js https://nodejs.org/
2. Run `npm install -g bower` to install the bower package manager
3. Navigate to project directory (javascript folder with app/ and test/)
4. Run `bower init` to generate `bower.json` file

    ```json
    {
      "name": "Project Name",
      "version": "1.0.0"
    }
    ```

5. Run `npm init` to generate `package.json` file

    ```json
    {
      "name": "Project Name",
      "version": "1.0.0",
      "scripts": {
        "test": "mocha -R spec"
      }
    }
    ```

6. Run `bower install mocha chai` to install mocha and chai for browser
7. Run `npm install mocha chai --save-dev` to install mocha and chai for node
8. Run `bower install http://sinonjs.org/releases/sinon-X.X.X.js` where X refers to each version number (see http://sinonjs.org/download/ for current version). This gets you the built version of sinon for the browser
9. Run `npm install sinon --save-dev` to install sinon for node
10. Setup boilerplate code for testing in the browser

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Javascript Testing</title>
        <link rel="stylesheet" href="../bower_components/mocha/mocha.css" />
    </head>
    <body>
        <div id="mocha"></div>
        <script src="../bower_components/chai/chai.js"></script>
        <script src="../bower_components/mocha/mocha.js"></script>
        <script src="../bower_components/sinon-X.X.X/index.js"></script>
        <script src="../app/functions.js"></script>
        <script>mocha.setup('bdd')</script>
        <script src="test.js"></script>
        <script>
            mocha.run();
        </script>
    </body>
    </html>
    ```

----

## Grunt Installation/Configuration
1. Run `npm install -g grunt-cli` to install the Grunt CLI globally
2. Add `gruntfile.js` to the root of the project directory alongside `package.json`. This file loads the `package.json` file into the property named `pkg` so that it can be used like metadata.

    ```javascript
    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json')
        });
    };
    ```

3. Run `npm intall grunt --save-dev` to install the Grunt runner
    * Grunt plugin installation pattern
        1. Install the npm module
        2. Tell Grunt to load the plugin
        3. Configure task by telling the plugin which files to operate on and passing some options 
4. Run `npm istall grunt-contrib-jshint --save-dev` to install the package for JSHinting
5. Update `gruntfile.js` with 

    ```javascript
    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            jshint: {
                files: ['gruntfile.js', 'app/*.js'],
                options: {
                    maxlen: 80,
                    quotmark: 'single'
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-jshint');
    };
    ```
6. Run `npm install grunt-contrib-concat --save-dev` to install the package for Concatenation
7. Update `gruntfile.js` with

    ```javascript
    // ...
    grunt.initConfig({
        // ...
        concat: {
            options: {
                separator: ';\n',
                banner: banner
            },
            build: {
                files: [{
                    src: ['app/*.js'],
                    dest: 'build/<%= pkg.name %>.js'
                }]
            }
        }
    });

    // ...
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint','concat']);
    // ...
    ```

8. Run `npm install grunt-contrib-uglify --save-dev` to install the package for Minification
9. Update `gruntfile.js` with

    ```javascript
    // ...
    grunt.initConfig({
        // ...
        uglify: {
            options: {
                banner: banner
            },
            build: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js']
                }
            }
        }
    });

    // ...
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint','concat','uglify']);
    // ...
    ```

10. Run `npm install grunt-simple-mocha --save-dev` to install the mocha grunt plugin
11. Update `gruntfile.js` with

    ```javascript
    // ...
    grunt.initConfig({
        // ...
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: {
                src: ['test/*.js']
            }
        }
    });

    // ...
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('default', ['jshint','simplemocha','concat','uglify']);
    // ...
    ```

## Miscellaneous
1. Run `npm install -g node-inspector` to install the node-inspector debugger