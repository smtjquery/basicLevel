'use strict';

var gulp    = require('gulp');
var bSync   = require('browser-sync').create();
var run     = require('run-sequence');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

/**
 * Only during build minify images.
 *
 * Dependencies:
 *  - npm i gulp-jshint --save-dev
 *  - npm i jshint-stylish --save-dev
 *
 * @task jshint
 */
gulp.task('jshint', function() {
  return gulp.src(['app/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

/**
 * Stream all changed files to browser.
 *
 * @task scripts
 */
gulp.task('scripts', function() {
  gulp.src(['app/scripts/**/*.js'])
    .pipe(bSync.stream());
});

/**
 * Stream all changed files to browser.
 *
 * @task styles
 */
gulp.task('styles', function() {
  gulp.src(['app/styles/**/*.css'])
    .pipe(bSync.stream());
});

/**
 * Stream all changed files to browser.
 *
 * @task views
 */
gulp.task('views', function() {
  gulp.src('app/**/*.html')
    .pipe(bSync.stream());
});

/**
 * Serves src or build files
 *
 * @task serve
 */
gulp.task('serve', function() {
  bSync.init({
    server: {
      baseDir: 'app'
    },
    notify: false,
    port: 3333
  });
});

/**
 * Watches for file changes to recompile our assets and refresh browser.
 *
 * @task watch
 */
gulp.task('watch', function() {
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/styles/**/*.css', ['styles']);
  gulp.watch('app/**/*.html', ['views']);
});

/**
 * Developer mode. Keep files the way theu are produced, place preprocessed
 * files in .temp folder. Run server and keep watching for files to update
 * server on fly.
 *
 * @task develop
 */
gulp.task('develop', function(cb) {
  run('jshint', ['scripts', 'styles', 'views'], 'serve', 'watch', cb);
});
