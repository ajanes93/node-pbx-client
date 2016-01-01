'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var gulpNSP = require('gulp-nsp');
var notify = require('gulp-notify');
var mocha = require('gulp-mocha');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('babel', function () {
  return gulp.src('lib/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('dist'))
  .pipe(notify({
    title: 'Gulp (Nimvelo)',
    message: 'Babel task finished.'
  }));
});

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(eslint())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function(cb) {
  gulpNSP({
    package: __dirname + '/package.json'
  }, cb);
});

gulp.task('test', ['babel', 'nsp'], function() {
	return gulp.src('test/test.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});


gulp.task('watch', function() {
  gulp.watch('lib/*.js', ['test'])
});


gulp.task('prepublish', ['test', 'nsp']);
