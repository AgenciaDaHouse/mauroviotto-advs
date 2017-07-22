'use strict'

/**
 * dependencies
 */
var gulp = require('gulp')
var livereload = require('gulp-livereload')
var gls = require('gulp-live-server')

/**
 * watch task
 */
gulp.task('watch', function () {
  livereload.listen({ port: 4100 })
  gulp.watch([ './src/**/*.styl' ], [ 'css' ])
  gulp.watch([ './src/**/*.js' ], [ 'js' ])
})

/**
 * server task
 */
gulp.task('server', [ 'env:dev', 'build', 'watch' ], function () {
  var server = gls.new('./index.js')
  server.start()
})
