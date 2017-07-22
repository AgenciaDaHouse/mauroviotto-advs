'use strict'

/**
 * dependencies
 */
var gulp = require('gulp')
var del = require('del')

/**
 * clean dist task
 */
gulp.task('clean:dist', function (next) {
  del('./public', next)
})
