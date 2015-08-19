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