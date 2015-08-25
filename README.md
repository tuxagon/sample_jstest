# JavaScript Testing Set Up for Browser & Node.js

This set up uses
* Mocha http://mochajs.org/
* Chai http://chaijs.com/
* Node https://nodejs.org/ 
* Bower http://bower.io/
* Sinon http://sinonjs.org/
* Grunt http://gruntjs.com/
    * JSHint (grunt-contrib-jshint) https://www.npmjs.com/package/grunt-contrib-jshint
    * Mocha (grunt-simple-mocha) https://github.com/yaymukund/grunt-simple-mocha
    * Concat (grunt-contrib-concat) https://github.com/gruntjs/grunt-contrib-concat
    * Uglify (grunt-contrib-uglify) https://github.com/gruntjs/grunt-contrib-uglify
    * Watch (grunt-contrib-watch) https://github.com/gruntjs/grunt-contrib-watch
* Gulp http://gulpjs.com/
    * JSHint (gulp-jshint) https://www.npmjs.com/package/gulp-jshint
    * Mocha (gulp-mocha) https://github.com/sindresorhus/gulp-mocha
    * Concat (gulp-concat) https://github.com/wearefractal/gulp-concat
    * Uglify (gulp-uglify) https://www.npmjs.com/package/gulp-uglify

----

## Testing Component Installation
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

6. Run `bower install mocha chai --save-dev` to install mocha and chai for browser
7. Run `npm install mocha chai --save-dev` to install mocha and chai for node
8. Run `bower install http://sinonjs.org/releases/sinon-X.X.X.js --save-dev` where X refers to each version number (see http://sinonjs.org/download/ for current version). This gets you the built version of sinon for the browser
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
12. Run `npm install grunt-contrib-watch --save-dev` to install the watch plugin
13. Update `gruntfile.js` with

    ```javascript
    // ...
    grunt.initConfig({
        // ...
        watch: {
            scripts: {
                files: ['gruntfile.js','app/*.js','test/**/*.js'],
                tasks: ['development']
            }
        }
    });

    // ...
    grunt.loadNpmTasks('grunt-contrib-watch');
    // ...
    ```
14. Run `grunt watch` to start the grunt watch task during development

## Gulp Installation/Configuration
1. Run `npm install gulp --g` to install the Gulp task runner
2. Run `npm install gulp --save-dev` to install a local copy of Gulp for a project
3. Run `npm install gulp-jshint --save-dev` to install the Gulp JSHint plugin
4. Run `npm install gulp-concat --save-dev` to install the Gulp concatenation plugin
5. Run `npm install gulp-uglify --save-dev` to install the Gulp minification plugin
6. Run `npm install gulp-mocha --save-dev` to install the Gulp mocha plugin
7. Add the following code to `gulpfile.js`
    ```javascript
    var fs = require('fs');
    var path = require('path');
    var gulp = require('gulp');
    var jshint = require('gulp-jshint');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var mocha = require('gulp-mocha');

    var pkg = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, './package.json'))
    );

    gulp.task('jshint:dev', function () {
        gulp.src(['gulpfile.js','test/**/*.js']).pipe(jshint({
            maxlen: 120
        })).pipe(jshint.reporter('default'));
    });

    gulp.task('jshint:app', function () {
        gulp.src(['app/*.js']).pipe(jshint({
            maxlen: 120
        })).pipe(jshint.reporter('default'));
    });

    gulp.task('test', function () {
        gulp.src(['test/**/*.js']).pipe(mocha());
    });

    gulp.task('concat', function () {
        gulp.src(['app/*.js']).pipe(concat(pkg.name + '.js')).pipe(gulp.dest('./build/'));
    });

    gulp.task('minify', function () {
        gulp.src(['./build/' + pkg.name + '.js']).pipe(uglify()).pipe(gulp.dest('./build/min/'))
    });

    gulp.task('development', function () {
        gulp.watch(['gulpfile.js','app/*js','test/**/*.js'], function () {
            gulp.run('jshint:dev','jshint:app','test');
        });
    });

    gulp.task('default', function () {
        gulp.run('jshint:dev','jshint:app','test','concat','minify');
    });
    ```
8. Run `gulp` to start the gulp process

## Miscellaneous
1. Run `npm install -g node-inspector` to install the node-inspector debugger
2. Run `node-debug app.js` to debug a javascript file named `app.js`
