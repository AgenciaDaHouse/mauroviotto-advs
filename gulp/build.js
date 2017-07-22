'use strict'

/**
 * dependencies
 */
var gulp = require('gulp')

/**
 * settings
 */
var tasks = [ 'css', 'js', 'img', 'font' ]

/**
 * build task
 */
gulp.task('build', [ 'env:dev', 'clean:dist', 'css', 'js', 'img', 'font' ])
